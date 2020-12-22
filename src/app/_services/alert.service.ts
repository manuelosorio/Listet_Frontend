import { Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert: Subject<any>;
  private keepAfterRouteChange = false;
  constructor(private route: Router) {
    this.alert = new Subject<any>();
    this.route.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });

  }

  getAlert(): Observable<any> {
    return this.alert.asObservable();
  }

  success(message: string, keepAfterRouterChange?: boolean | false){
    this.keepAfterRouteChange = keepAfterRouterChange;
    this.alert.next({type: 'success', text: message});
  }
  warning(message: string, keepAfterRouterChange?: boolean | false){
    this.keepAfterRouteChange = keepAfterRouterChange;
    this.alert.next({type: 'warning', text: message});
  }
  error(message: string, keepAfterRouterChange?: boolean | false){
    this.keepAfterRouteChange = keepAfterRouterChange;
    this.alert.next({type: 'error', text: message});
  }
  clear(){
    this.alert.next();
  }

}

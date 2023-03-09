import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { Alert } from '../models/alerts.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alert: Alert;
  private alertSubject: BehaviorSubject<Alert>;
  private cssClasses: Record<string, string> = {
    success: 'alert--success',
    warning: 'alert--warning',
    error: 'alert--error',
  };
  private keepAfterRouteChange = false;
  constructor(private route: Router) {
    this.alertSubject = new BehaviorSubject<Alert>(this.alert);
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

  getAlert(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }

  getCssClass() {
    return this.cssClasses;
  }

  success(
    message: string,
    link?: {
      text: string;
      url: string;
    },
    timeout?: number,
    keepAfterRouterChange?: boolean
  ): void {
    this.alertSubject.next(null);
    this.keepAfterRouteChange = keepAfterRouterChange;
    this.alertSubject.next({
      type: 'success',
      message,
      link,
      timeout,
      // id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    });
  }

  warning(
    message: string,
    link?: {
      text: string;
      url: string;
    },
    timeout?: number,
    keepAfterRouterChange?: boolean
  ): void {
    this.keepAfterRouteChange = keepAfterRouterChange;
    this.alertSubject.next({
      type: 'warning',
      message,
      link,
      timeout,
      // id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    });
  }

  error(
    message: string,
    link?: {
      text: string;
      url: string;
    },
    timeout?: number,
    keepAfterRouterChange?: boolean
  ): void {
    this.keepAfterRouteChange = keepAfterRouterChange;
    this.alertSubject.next({
      type: 'error',
      message,
      link,
      timeout,
      // id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    });
  }
  clear() {
    this.alertSubject.next(null);
  }
}

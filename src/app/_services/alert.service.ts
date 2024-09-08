import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { Alert } from '@models/alerts.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly alert!: Alert;
  private alertSubject: BehaviorSubject<Alert | null>;
  private cssClasses: Record<string, string> = {
    success: 'alert--success',
    warning: 'alert--warning',
    error: 'alert--error',
  };
  private keepAfterRouteChange: boolean = false;
  constructor(private route: Router) {
    this.alertSubject = new BehaviorSubject<Alert | null>(this.alert);
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
    return this.alertSubject.asObservable() as Observable<Alert>;
  }

  getCssClass() {
    return this.cssClasses;
  }

  /**
   * Creates success alert toast.
   * example
   * this.alertService.success('This is a success message', { text: 'Click here', url: '/link' }, 5000, true);
   * @param message The message to display.
   * @param link An object containing the text and url for the link.
   * @param timeout The time in milliseconds to display the alert.
   * @param keepAfterRouterChange Whether to keep the alert after a router change.
   * @deprecated There will be a more robust method available in a future version.
   */
  success(
    message: string,
    link?: {
      text: string;
      url: string;
    } | null,
    timeout?: number,
    keepAfterRouterChange?: boolean
  ): void {
    this.alertSubject.next(null);
    this.keepAfterRouteChange = keepAfterRouterChange ?? false;
    this.alertSubject.next({
      type: 'success',
      message,
      link,
      timeout,
      // id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    });
  }

  /**
   * Creates warning alert toast.
   * @example
   * this.alertService.warning('This is a warning message', { text: 'Click here', url: '/link' }, 5000, true);
   * @param message The message to display.
   * @param link An object containing the text and url for the link.
   * @param timeout The time in milliseconds to display the alert.
   * @param keepAfterRouterChange Whether to keep the alert after a router change.
   * @deprecated There will be a more robust method available in a future version.
   */
  warning(
    message: string,
    link: {
      text: string;
      url: string;
    } | null,
    timeout?: number,
    keepAfterRouterChange?: boolean
  ): void {
    this.keepAfterRouteChange = keepAfterRouterChange ?? false;
    this.alertSubject.next({
      type: 'warning',
      message,
      link,
      timeout,
      // id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    });
  }

  /**
   * Creates error alert toast.
   * example
   * this.alertService.error('This is an error message', { text: 'Click here', url: '/link' }, 5000, true);
   * @param message The message to display.
   * @param link An object containing the text and url for the link.
   * @param timeout The time in milliseconds to display the alert.
   * @param keepAfterRouterChange Whether to keep the alert after a router change.
   * @deprecated There will be a more robust method available in a future version.
   */
  error(
    message: string,
    link?: {
      text: string;
      url: string;
    } | null,
    timeout?: number,
    keepAfterRouterChange?: boolean
  ): void {
    this.keepAfterRouteChange = keepAfterRouterChange ?? false;
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

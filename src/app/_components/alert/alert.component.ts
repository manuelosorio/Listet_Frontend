import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { Observable } from 'rxjs';
import { AsyncPipe, isPlatformBrowser, NgClass, NgIf } from '@angular/common';
import { IconsModule } from '../../_modules/icons/icons.module';
import { RouterLink } from '@angular/router';
import { Alert } from '../../models/alerts.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [IconsModule, NgIf, NgClass, RouterLink, AsyncPipe],
  standalone: true,
})
export class AlertComponent implements OnInit, OnDestroy {
  private currentAlert?: Alert | null;
  animationClass: string = '';
  public alert$?: Observable<Alert | any>;
  cssClasses: Record<string, string> = {};
  private readonly isBrowser: boolean;
  constructor(
    private alertService: AlertService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // TODO: display multiple toast via a queueing system
      this.alert$ = this.alertService.getAlert().pipe(
        map((alert: Alert) => {
          if (!alert) {
            return alert;
          }
          if (this.currentAlert && alert === this.currentAlert) {
            this.currentAlert = alert;
            this.animationClass = '';
            setTimeout(() => {
              this.animationClass = 'slideInRight';
            }, 600);
          } else {
            this.currentAlert = alert;
            this.cssClasses = this.alertService.getCssClass();
            this.animationClass = 'slideInRight';
          }
          if (alert.timeout) {
            setTimeout(() => {
              this.clear();
            }, alert.timeout);
          }

          return alert;
        })
      );
    }
  }

  clear(): void {
    this.animationClass = '';
    this.currentAlert = null;
    setTimeout(() => {
      this.alertService.clear();
    }, 600);
  }

  ngOnDestroy(): void {
    this.clear();
  }
}

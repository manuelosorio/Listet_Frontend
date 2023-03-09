import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { Observable } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';
import { IconsModule } from '../../_modules/icons/icons.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';
import { Alert } from '../../models/alerts.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [BrowserAnimationsModule, IconsModule, NgIf, NgClass, RouterLink],
  standalone: true,
})
export class AlertComponent implements OnInit, OnDestroy {
  private currentAlert: Alert;
  animationClass: string;
  public alert$: Observable<Alert>;
  cssClasses: Record<string, string>;
  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alert$ = this.alertService.getAlert().pipe(
      map(alert => {
        if (!alert) {
          return;
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

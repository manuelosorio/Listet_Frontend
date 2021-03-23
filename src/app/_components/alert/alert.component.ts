import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getAlert().subscribe(alert => {
      switch (alert && alert.type) {
        case 'success':
          alert.cssClass = 'alert alert--success';
          break;
        case 'warning':
          alert.cssClass = 'alert alert--warning';
          break;
        case 'error':
          alert.cssClass = 'alert alert--error';
          break;
      }
      this.message = alert;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  closeFlashMessage() {
    this.alertService.clear();
  }
}

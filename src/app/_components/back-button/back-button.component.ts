import {Component} from '@angular/core';
import { FeatherModule } from 'angular-feather';

@Component({
    selector: 'app-back-button',
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.sass'],
    standalone: true,
    imports: [FeatherModule]
})
export class BackButtonComponent {
  constructor() {
  }
  onNgInit(): void {
  }
  back(): void {
    history.go(-1);
  }
}

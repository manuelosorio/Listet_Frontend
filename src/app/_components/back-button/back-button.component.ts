import {Component} from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.sass']
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

import { Component } from '@angular/core';
import { IconsModule } from '../../_modules/icons/icons.module';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  standalone: true,
  styleUrls: ['./back-button.component.sass'],
  imports: [IconsModule],
})
export class BackButtonComponent {
  constructor() {}
  onNgInit(): void {}
  back(): void {
    history.go(-1);
  }
}

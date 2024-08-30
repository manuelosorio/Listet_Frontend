import { Component, OnInit } from '@angular/core';
import { IconsModule } from '../../_modules/icons/icons.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
  imports: [IconsModule],
  standalone: true,
})
export class FooterComponent {
  constructor() {}
  currentYear: number = new Date().getFullYear();
}

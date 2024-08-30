import { Component } from '@angular/core';
import { IconsModule } from '../../_modules/icons/icons.module';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass'],
  imports: [IconsModule],
  standalone: true,
})
export class NotFoundComponent {
  constructor() {}
}

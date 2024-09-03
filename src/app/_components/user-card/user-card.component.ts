import { Component, Input, ViewEncapsulation } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { RouterLink } from '@angular/router';
import { IconsModule } from '../../_modules/icons/icons.module';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.sass'],
  encapsulation: ViewEncapsulation.Emulated,
  imports: [RouterLink, IconsModule],
  standalone: true,
})
export class UserCardComponent {
  constructor() {}
  @Input() user?: UserModel;
}

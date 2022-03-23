import { Component, Input, ViewEncapsulation } from "@angular/core";
import { UserModel } from "../../models/user.model";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.sass'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UserCardComponent {
  constructor() {
  }
  @Input() user: UserModel;
}

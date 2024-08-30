import { Component, Input, ViewEncapsulation } from "@angular/core";
import { UserModel } from "../../models/user.model";
import { FeatherModule } from "angular-feather";
import { RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.sass'],
    encapsulation: ViewEncapsulation.Emulated,
    standalone: true,
    imports: [NgIf, RouterLink, FeatherModule]
})
export class UserCardComponent {
  constructor() {
  }
  @Input() user: UserModel;
}

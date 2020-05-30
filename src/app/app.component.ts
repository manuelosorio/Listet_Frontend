import { Component } from '@angular/core';
import {UsersService} from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'todo-list';
  authenticated;

  constructor(
    private userService: UsersService,
  ) {
    this.userService.authenticated.subscribe(authenticated => {
      this.authenticated = authenticated;
    });
  }
}

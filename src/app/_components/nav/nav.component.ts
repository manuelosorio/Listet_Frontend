import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../_services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  authenticated: boolean;
  constructor(
    private userService: UsersService,
  ) {
    this.userService.authenticated.subscribe(authenticated => {
      this.authenticated = authenticated;
    });
  }
  logout() {
    this.userService.logoutUser();
  }
  ngOnInit(): void {
  }
}

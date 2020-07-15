import { Component, OnInit } from '@angular/core';
import {UsersService} from '../user/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  authenticated;
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
    /**
     * TODO: Write the actual auth check!
     *       Current method is for testing purposes
     *       and is not secure!
     */
    // this.userService.isAuth().subscribe(
    //   data => {
    //     if (!data) {
    //       this.login = false;
    //       console.log('User not logged in');
    //     } else {
    //       this.login = true;
    //       this.user = data;
    //     }
    //   }
    // );
  // this.userService.isAuth();
  }
}

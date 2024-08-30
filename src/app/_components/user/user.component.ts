import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.sass'],
    standalone: true
})
export class UserComponent implements OnInit, OnDestroy {
  private getUsers$: Subscription;
  constructor(private userService: UsersService) {}
  public users: object;

  ngOnInit(): void {
    this.getUsers$ = this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  ngOnDestroy() {
    this.getUsers$.unsubscribe();
  }
}

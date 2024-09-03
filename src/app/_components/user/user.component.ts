import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { Subscription } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
  standalone: true,
})
export class UserComponent implements OnInit, OnDestroy {
  private getUsers$: Subscription = new Subscription();
  constructor(private userService: UsersService) {}
  public users: UserModel[] = [];

  ngOnInit(): void {
    this.getUsers$ = this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }
  ngOnDestroy() {
    this.getUsers$.unsubscribe();
  }
}

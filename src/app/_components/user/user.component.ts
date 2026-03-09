import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from '@models/user.model';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
  standalone: true,
})
export class UserComponent implements OnInit, OnDestroy {
  private userService = inject(UsersService);

  private getUsers$: Subscription = new Subscription();
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

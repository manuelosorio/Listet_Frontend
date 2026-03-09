import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UsersService } from '@services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.sass'],
  standalone: true,
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  private userService = inject(UsersService);
  private route = inject(ActivatedRoute);

  private token;
  private verifyAccount$: Subscription = new Subscription();
  constructor() {
    this.token = this.route.snapshot.params.token;
  }

  ngOnInit(): void {
    this.verifyAccount$ = this.userService.verifyAccount(
      this.route.snapshot.params.token
    );
  }

  ngOnDestroy() {
    this.verifyAccount$.unsubscribe();
  }
}

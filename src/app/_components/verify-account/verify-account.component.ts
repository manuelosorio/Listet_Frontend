import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-verify-account',
    templateUrl: './verify-account.component.html',
    styleUrls: ['./verify-account.component.sass'],
    standalone: true
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  private token;
  private verifyAccount$: Subscription;
  constructor(private userService: UsersService,
              private route: ActivatedRoute) {
    this.token = this.route.snapshot.params.token;
  }

  ngOnInit(): void {
    this.verifyAccount$ = this.userService.verifyAccount(this.route.snapshot.params.token);
  }

  ngOnDestroy() {
    this.verifyAccount$.unsubscribe();
  }
}

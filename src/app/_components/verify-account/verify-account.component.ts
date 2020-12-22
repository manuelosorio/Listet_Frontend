import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../_services/users.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.sass']
})
export class VerifyAccountComponent implements OnInit {
  private token;

  constructor(private userService: UsersService,
              private route: ActivatedRoute) {
    this.token = this.route.snapshot.params.token;
  }

  ngOnInit(): void {
    this.userService.verifyAccount(this.route.snapshot.params.token);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-delete-account',
  templateUrl: './settings-delete-account.component.html',
  styleUrls: ['./settings-delete-account.component.sass']
})
export class SettingsDeleteAccountComponent implements OnInit, OnDestroy {
  private deactivateAccount$: Subscription
  public formGroup: FormGroup
  constructor(
    private userService: UsersService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      password: []
    });
  }

  ngOnInit(): void {
  }

  deactivateAccount(password) {
    console.log(password)
    this.deactivateAccount$ = this.userService.deactivateAccount(password);
  }
  ngOnDestroy() {
  }
}

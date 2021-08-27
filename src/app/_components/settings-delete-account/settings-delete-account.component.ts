import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      password: ['',
        [
          Validators.required
        ]
      ]
    });
  }

  ngOnInit(): void {
  }

  get password() {
    return this.formGroup.get('password');
  }

  deactivateAccount(password) {
    console.log(password)
    this.deactivateAccount$ = this.userService.deactivateAccount(password);
  }
  ngOnDestroy() {
  }
}

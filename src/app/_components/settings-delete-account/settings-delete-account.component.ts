import { Component } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-delete-account',
  templateUrl: './settings-delete-account.component.html',
  styleUrls: ['./settings-delete-account.component.sass']
})
export class SettingsDeleteAccountComponent {
  private deactivateAccount$: Subscription;
  private deleteAccount$: Subscription;
  public formGroup: FormGroup;

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

  get password(): AbstractControl {
    return this.formGroup.get('password');
  }

  deactivateAccount(password: string): void {
    this.deactivateAccount$ = this.userService.deactivateAccount(password);
  }
  deleteAccount(password: string): void {
    this.deleteAccount$ = this.userService.deleteAccount(password);
  }
}

import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { UsersService } from '@services/users.service';

@Component({
    selector: 'app-settings-delete-account',
    templateUrl: './settings-delete-account.component.html',
    styleUrls: ['./settings-delete-account.component.sass'],
    imports: [ReactiveFormsModule, FeatherModule]
})
export class SettingsDeleteAccountComponent {
  private userService = inject(UsersService);
  private httpClient = inject(HttpClient);
  private formBuilder = inject(UntypedFormBuilder);

  private deactivateAccount$!: Subscription;
  private deleteAccount$!: Subscription;
  public formGroup: UntypedFormGroup;

  constructor() {
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required]],
    });
  }

  get password(): AbstractControl {
    return <AbstractControl<any, string>>this.formGroup.get('password');
  }

  deactivateAccount(password: string): void {
    this.deactivateAccount$ = this.userService.deactivateAccount(password);
  }
  deleteAccount(password: string): void {
    this.deleteAccount$ = this.userService.deleteAccount(password);
  }
}

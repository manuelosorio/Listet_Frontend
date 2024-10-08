import { Component } from '@angular/core';
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
  standalone: true,
  imports: [ReactiveFormsModule, FeatherModule],
})
export class SettingsDeleteAccountComponent {
  private deactivateAccount$!: Subscription;
  private deleteAccount$!: Subscription;
  public formGroup: UntypedFormGroup;

  constructor(
    private userService: UsersService,
    private httpClient: HttpClient,
    private formBuilder: UntypedFormBuilder
  ) {
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

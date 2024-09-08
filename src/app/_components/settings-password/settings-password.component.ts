import { Component } from '@angular/core';
import { UsersService } from '@services/users.service';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { EndpointResponse } from '@models/response/endpoint.response';
import { ErrorResponse } from '@models/response/errors/error.response';
import { AlertService } from '@services/alert.service';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-settings-password',
  templateUrl: './settings-password.component.html',
  styleUrls: ['./settings-password.component.sass'],
  standalone: true,
  imports: [ReactiveFormsModule, FeatherModule],
})
export class SettingsPasswordComponent {
  public passwordForm: UntypedFormGroup;
  constructor(
    private userService: UsersService,
    private alertService: AlertService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9\d@$!%*#?&]+){8,}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        currentPassword: ['', [Validators.required]],
      },
      {
        validators: [this.checkPassword],
      }
    );
  }

  private checkPassword: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const newPassword = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    if (!newPassword || !confirmPassword) {
      return null;
    }
    if (confirmPassword.errors && !confirmPassword.errors['notSame']) {
      return null;
    }
    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({
        notSame: true,
      });
    } else {
      confirmPassword.setErrors(null);
    }
    return null;
  };

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }
  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }
  get currentPassword() {
    return this.passwordForm.get('currentPassword');
  }

  submit(data: any) {
    this.userService.changePassword(data).subscribe({
      next: (response: any) => {
        const res: EndpointResponse = response;
        this.alertService.success(res.message);
        this.passwordForm.reset();
      },
      error: (error: ErrorResponse) => {
        this.alertService.error(error.error.message);
      },
    });
  }
}

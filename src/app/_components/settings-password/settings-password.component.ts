import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EndpointResponse } from '../../models/response/endpoint.response';
import { ErrorResponse } from '../../models/response/errors/error.response';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-settings-password',
  templateUrl: './settings-password.component.html',
  styleUrls: ['./settings-password.component.sass']
})
export class SettingsPasswordComponent implements OnInit {
  public passwordForm: FormGroup
  constructor(private userService: UsersService,
              private alertService: AlertService,
              private formBuilder: FormBuilder) {
    this.passwordForm = this.formBuilder.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9\d@$!%*#?&]+){8,}$/)
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ],
      currentPassword: [
        '',
        [
          Validators.required
        ]
      ]
    }, {
      validators: [this.checkPassword]
    });
  }

  ngOnInit(): void {
  }
  private checkPassword: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    const newPassword = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');

    if (confirmPassword.errors && !(confirmPassword.errors.notSame)) {
      return;
    }
    if (newPassword.value !== confirmPassword.value ) {
      confirmPassword.setErrors({
        notSame: true
      });
    } else {
      confirmPassword.setErrors(null)
    }
  }

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
    this.userService.changePassword(data).subscribe((res: EndpointResponse) => {
      this.alertService.success(res.message)
      this.passwordForm.reset();
    }, (error: ErrorResponse) => {
      this.alertService.error(error.error.message)
    });
  }
}

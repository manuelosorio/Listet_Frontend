import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-password',
  templateUrl: './settings-password.component.html',
  styleUrls: ['./settings-password.component.sass']
})
export class SettingsPasswordComponent implements OnInit {
  public passwordForm: FormGroup
  constructor(private userService: UsersService,
              private formBuilder: FormBuilder) {
    this.passwordForm = this.formBuilder.group({
      newPassword: [
        Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9\d@$!%*#?&]+){8,}$/)
      ],
      confirmPassword: [
        Validators.required,
      ],
      currentPassword: []
    }, {
      // validators: [this.checkPassword]
    });
  }

  ngOnInit(): void {
  }
  // private checkPassword: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
  //   const newPassword = this.newPassword.value;
  //   const currentPassword = this.currentPassword.value
  //   return newPassword === currentPassword ? null : { notSame: true };
  // }

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
    this.userService.changePassword(data);
  }
}

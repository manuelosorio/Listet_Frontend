import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UsersService} from '../../_services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
  ) {
    this.forgotPasswordForm = formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)
      ]],
    });
  }

  ngOnInit(): void {
  }
  get email() {
    return this.forgotPasswordForm.get('email');
  }
  onSubmit(data) {
    this.userService.requestPasswordReset(data);
  }
}

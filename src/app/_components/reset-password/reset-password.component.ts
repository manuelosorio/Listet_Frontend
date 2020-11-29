import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UsersService} from '../../_services/users.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm;
  private token: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9\d@$!%*#?&]+){8,}$/)
      ]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
  }
  get password() {
    return this.resetPasswordForm.get('password');
  }
  onSubmit(data) {
    this.userService.resetPassword(this.token, data);
  }
}

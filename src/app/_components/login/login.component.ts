import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UsersService} from '../../_services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm;
  isChecked: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
  ) {
    this.loginForm = formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      remember: [false]
    });
  }

  ngOnInit(): void {
    this.isChecked = false;
  }
  onSubmit(data) {
    this.userService.loginUser(data);
    this.loginForm.reset();
  }
  checked(event) {
    return this.isChecked = event.target.checked;
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}

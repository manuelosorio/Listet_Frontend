import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
  ) {
    this.loginForm = formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }
  onSubmit(data) {
    this.userService.loginUser(data);
    this.loginForm.reset();
  }
}

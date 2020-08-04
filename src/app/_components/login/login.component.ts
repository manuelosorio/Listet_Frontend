import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
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
      username: '',
      password: '',
      remember: ''
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
}

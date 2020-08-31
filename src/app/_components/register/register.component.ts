import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UsersService} from '../../_services/users.service';
import {UserError} from '../../models/errors/user.error';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registrationForm;
  errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
  ) {
    this.registrationForm = formBuilder.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9\d@$!%*#?&]+){8,}$/)
      ]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(data) {
    this.userService.createUser(data);
    this.userService.authenticationErr.subscribe( (res: UserError) => {
      this.errorMessage = res.error.message;
    });
  }
  get username() {
    return this.registrationForm.get('username');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }


}

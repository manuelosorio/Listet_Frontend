import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {UsersService} from '../users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  signupForm;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {
    this.signupForm = formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(data) {
    this.userService.createUser(data);
    this.signupForm.reset();
    this.router.navigate(['/users']).then(r => console.log(r));
  }


}

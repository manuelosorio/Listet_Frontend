import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UsersService} from '../../_services/users.service';
import {UserError} from '../../models/errors/user.error';
import {MetaTagModel} from '../../models/metatag.model';
import {SeoService} from '../../_services/seo.service';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registrationForm;
  errorMessage: string;
  private meta: MetaTagModel;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private seoService: SeoService
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
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      username: ['', [
        Validators.required,
        Validators.pattern(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9\d@$!%*#?&]+){8,}$/)
      ]]
    });
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Register Account',
      image: 'https://listet.manuelosorio.me/assets/images/listet-banner.jpg/',
      url: 'https://listet.manuelosorio.me/register/'
    };
  }

  ngOnInit(): void {
    this.seoService.updateInfo(this.meta);
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

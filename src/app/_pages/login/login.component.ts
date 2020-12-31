import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../_services/users.service';
import {UserError} from '../../models/errors/user.error';
import {MetaTagModel} from '../../models/metatag.model';
import {SeoService} from '../../_services/seo.service';
import {AlertService} from '../../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isChecked: boolean;
  errorMessage: string;
  private meta: MetaTagModel;
  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private seoService: SeoService,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      remember: [false]
    });
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Login',
      openGraphImage: 'https://listet.manuelosorio.me/assets/images/listet-open-graph.jpg',
      twitterImage: 'https://listet.manuelosorio.me/assets/images/listet-twitter.jpg',
      url: 'https://listet.manuelosorio.me/login/'
    };
  }

  ngOnInit(): void {
    this.isChecked = false;
    this.seoService.updateInfo(this.meta);
  }
  onSubmit(data) {
    this.userService.loginUser(data);
    this.userService.authenticationErr.subscribe( (res: UserError) => {
      this.errorMessage = res.error.message;
      this.alertService.error(this.errorMessage);
    });
    this.verify();

  }
  verify() {
    this.userService.isVerified();
  }
  checked(event) {
    return this.isChecked = event.target.checked;
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}

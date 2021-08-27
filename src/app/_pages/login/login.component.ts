import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../_services/users.service';
import { ErrorResponse } from '../../models/response/errors/error.response';
import { MetaTagModel } from '../../models/metatag.model';
import { SeoService } from '../../_services/seo.service';
import { AlertService } from '../../_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isChecked: boolean;
  errorMessage: string;
  private readonly meta: MetaTagModel;
  private returnUrl: string;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private seoService: SeoService,
    private route: ActivatedRoute,
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
      openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
      twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
      url: `${environment.url}/login/`
    };
  }

  ngOnInit(): void {
    this.isChecked = false;
    this.seoService.updateInfo(this.meta)
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
  }

  onSubmit(data) {
    this.userService.loginUser(data, this.returnUrl);
    this.userService.authenticationErr.subscribe((res: ErrorResponse) => {
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

import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BackButtonComponent } from '@components/back-button/back-button.component';
import { environment } from '@environments/environment';
import { ErrorResponse } from '@models/response/errors/error.response';
import { MetaTagModel } from '@models/metatag.model';
import { IconsModule } from '@modules/icons/icons.module';
import { AlertService } from '@services/alert.service';
import { SeoService } from '@services/seo.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  imports: [BackButtonComponent, ReactiveFormsModule, IconsModule, RouterLink],
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  isChecked!: boolean;
  errorMessage: string = '';
  private readonly meta: MetaTagModel;
  private returnUrl: string = '';

  constructor(
    private alertService: AlertService,
    private formBuilder: UntypedFormBuilder,
    private userService: UsersService,
    private seoService: SeoService,
    private route: ActivatedRoute
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false],
    });
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Login',
      openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
      twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
      url: `${environment.url}/login/`,
    };
  }

  ngOnInit(): void {
    this.isChecked = false;
    this.seoService.updateInfo(this.meta);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  onSubmit(data: unknown) {
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

  checked(event: Event | any) {
    return (this.isChecked = event.target.checked);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

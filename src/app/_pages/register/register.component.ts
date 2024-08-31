import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../_services/users.service';
import { ErrorResponse } from '../../models/response/errors/error.response';
import { MetaTagModel } from '../../models/metatag.model';
import { SeoService } from '../../_services/seo.service';
import { environment } from '../../../environments/environment';

import { BackButtonComponent } from '../../_components/back-button/back-button.component';
import { IconsModule } from '../../_modules/icons/icons.module';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  imports: [
    ReactiveFormsModule,
    BackButtonComponent,
    IconsModule
],
  standalone: true,
})
export class RegisterComponent implements OnInit {
  registrationForm;
  errorMessage?: string;
  private readonly meta: MetaTagModel;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UsersService,
    private seoService: SeoService
  ) {
    this.registrationForm = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9\d@$!%*#?&]+){8,}$/
          ),
        ],
      ],
    });
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Register Account',
      openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
      twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
      url: `${environment.url}/register/`,
    };
  }

  ngOnInit(): void {
    this.seoService.updateInfo(this.meta);
  }

  onSubmit(data: unknown) {
    this.userService.createUser(data);
    this.userService.authenticationErr.subscribe((res: ErrorResponse) => {
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

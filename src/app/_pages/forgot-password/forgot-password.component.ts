import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../_services/users.service';
import { SeoService } from '../../_services/seo.service';
import { MetaTagModel } from '../../models/metatag.model';
import { environment } from '../../../environments/environment';
import { BackButtonComponent } from '../../_components/back-button/back-button.component';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass'],
  imports: [BackButtonComponent, ReactiveFormsModule],
  standalone: true,
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm;
  private readonly meta: MetaTagModel;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UsersService,
    private seoService: SeoService
  ) {
    this.forgotPasswordForm = formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
    });
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Forgot Password',
      openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
      twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
      url: `${environment.url}/forgot-password/`,
    };
  }

  ngOnInit(): void {
    this.seoService.updateInfo(this.meta);
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit(data: unknown) {
    this.userService.requestPasswordReset(data);
  }
}

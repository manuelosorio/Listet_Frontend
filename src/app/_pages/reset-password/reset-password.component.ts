import { Component, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@services/users.service';
import { MetaTagModel } from '@models/metatag.model';
import { SeoService } from '@services/seo.service';
import { environment } from '@environments/environment';
import { BackButtonComponent } from '@components/back-button/back-button.component';
import { passwordPattern } from '@utilities/regex-patterns';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.sass'],
    imports: [BackButtonComponent, ReactiveFormsModule]
})
export class ResetPasswordComponent implements OnInit {
  private formBuilder = inject(UntypedFormBuilder);
  private userService = inject(UsersService);
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  resetPasswordForm: UntypedFormGroup;
  private token: string = '';
  private readonly meta: MetaTagModel;

  constructor() {
    const formBuilder = this.formBuilder;

    this.resetPasswordForm = formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            passwordPattern
          ),
        ],
      ],
    });
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Reset Password',
      openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
      twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
      url: `${environment.url}/reset-password/`,
    };
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    this.seoService.updateInfo(this.meta);
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  onSubmit(data: unknown) {
    this.userService.resetPassword(this.token, data);
  }
}

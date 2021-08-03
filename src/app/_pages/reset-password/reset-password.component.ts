import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../_services/users.service';
import { ActivatedRoute } from '@angular/router';
import { MetaTagModel } from '../../models/metatag.model';
import { SeoService } from '../../_services/seo.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  private token: string;
  private readonly meta: MetaTagModel;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {
    this.resetPasswordForm = formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&])([a-zA-Z0-9\d@$!%*#?&]+){8,}$/)
      ]]
    });
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Reset Password',
      openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
      twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
      url: `${environment.url}/reset-password/`
    };
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
    this.seoService.updateInfo(this.meta);
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  onSubmit(data) {
    this.userService.resetPassword(this.token, data);
  }
}

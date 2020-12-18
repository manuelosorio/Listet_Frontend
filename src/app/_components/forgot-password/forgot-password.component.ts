import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UsersService} from '../../_services/users.service';
import {SeoService} from '../../_services/seo.service';
import {MetaTagModel} from '../../models/metatag.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm;
  private meta: MetaTagModel;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private seoService: SeoService
  ) {
    this.forgotPasswordForm = formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)
      ]],
    });
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Forgot Password',
      openGraphImage: 'https://listet.manuelosorio.me/assets/images/listet-open-graph.jpg',
      twitterImage: 'https://listet.manuelosorio.me/assets/images/listet-twitter.jpg',
      url: 'https://listet.manuelosorio.me/forgot-password/'
    };
  }

  ngOnInit(): void {
    this.seoService.updateInfo(this.meta);
  }
  get email() {
    return this.forgotPasswordForm.get('email');
  }
  onSubmit(data) {
    this.userService.requestPasswordReset(data);
  }
}

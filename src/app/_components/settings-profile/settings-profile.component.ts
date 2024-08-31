import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { FeatherModule } from 'angular-feather';


@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.sass'],
  standalone: true,
  imports: [ReactiveFormsModule, FeatherModule],
})
export class SettingsProfileComponent implements OnInit, OnDestroy {
  public profileForm: UntypedFormGroup;
  private updateAccountInfo$!: Subscription;
  constructor(
    private userService: UsersService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.profileForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userService.userInfo$.subscribe(res => {
      console.log(res);
      this.profileForm.setValue({
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
      });
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  submit(data: any): void {
    this.updateAccountInfo$ = this.userService.updateAccountInfo(data);
  }
  get firstName(): AbstractControl {
    return <AbstractControl<any, string>>this.profileForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return <AbstractControl<any, string>>this.profileForm.get('lastName');
  }
  get email(): AbstractControl {
    return <AbstractControl<any, string>>this.profileForm.get('email');
  }

  ngOnDestroy(): void {
    this.updateAccountInfo$?.unsubscribe();
  }
}

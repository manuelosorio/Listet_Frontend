import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.sass']
})
export class SettingsProfileComponent implements OnInit, OnDestroy {
  public profileForm: FormGroup
  private updateAccountInfo$: Subscription;
  constructor(private userService: UsersService,
              private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      email: [],
      firstName: [],
      lastName: [],
    });
  }

  ngOnInit(): void {
    this.userService.userInfo$.subscribe(res => {
      console.log(res);
      this.profileForm.setValue({
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName
      });
    });
  }
  submit(data) {
    this.updateAccountInfo$ = this.userService.updateAccountInfo(data);
  }
  ngOnDestroy(): void {
  }
  get firstName() {
    return this.profileForm.get('firstName');
  }
  get lastName() {
    return this.profileForm.get('lastName');
  }
  get email() {
    return this.profileForm.get('email');
  }
}

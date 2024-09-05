import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { UsersService } from '../../_services/users.service';
import { SeoService } from '../../_services/seo.service';
import { Subject } from 'rxjs';
import { BackButtonComponent } from '../../_components/back-button/back-button.component';
import { IconsModule } from '../../_modules/icons/icons.module';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let usersService: jest.Mocked<UsersService>;
  let seoService: jest.Mocked<SeoService>;

  beforeEach(
    waitForAsync(() => {
      usersService = ({
        createUser: jest.fn(),
        authenticationErr: new Subject(),
      } as unknown) as jest.Mocked<UsersService>;

      seoService = ({
        updateInfo: jest.fn(),
      } as unknown) as jest.Mocked<SeoService>;

      TestBed.configureTestingModule({
        imports: [RegisterComponent, BackButtonComponent],
        providers: [
          provideRouter([]),
          IconsModule,
          UntypedFormBuilder,
          ReactiveFormsModule,
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
          { provide: UsersService, useValue: usersService },
          { provide: SeoService, useValue: seoService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid when empty', () => {
    expect(component.registrationForm.valid).toBeFalsy();
  });
  it('first name should be invalid when empty', () => {
    let firstName = component.registrationForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();
  });
  it('last name should be invalid when empty', () => {
    let lastName = component.registrationForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();
  });
  it('email should be invalid when pattern does not match', () => {
    let email = component.registrationForm.controls['email'];
    email.setValue('invalidEmail');
    expect(email.valid).toBeFalsy();
  });
  it('username should be invalid when pattern does not match', () => {
    let username = component.registrationForm.controls['username'];
    username.setValue('..username');
    expect(username.valid).toBeFalsy();
  });
  it('password should be invalid when pattern does not match', () => {
    let password = component.registrationForm.controls['password'];
    password.setValue('short');
    expect(password.valid).toBeFalsy();
  });
  it('should disable the register button when form is empty or invalid', () => {
    component.registrationForm.setValue({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.btn--disabled');
    expect(button.disabled).toBeTruthy();
  });
  it('should call onSubmit method when submit button clicked', () => {
    const spy = jest.spyOn(component, 'onSubmit');
    component.registrationForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      username: 'john123',
      password: 'Password@123',
    });
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('.form__btn');
    button.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
  it('should call createUser method when onSubmit is called', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      username: 'john123',
      password: 'Password123',
    };
    component.onSubmit(formData);
    expect(usersService.createUser).toHaveBeenCalledWith(formData);
  });
});

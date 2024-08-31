import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        RegisterComponent],
    providers: [UntypedFormBuilder, ReactiveFormsModule, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

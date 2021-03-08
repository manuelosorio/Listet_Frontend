import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
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

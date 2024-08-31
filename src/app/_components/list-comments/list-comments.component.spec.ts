import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCommentsComponent } from './list-comments.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BackButtonComponent } from '../back-button/back-button.component';

describe('ListCommentsComponent', () => {
  let component: ListCommentsComponent;
  let fixture: ComponentFixture<ListCommentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BackButtonComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ListCommentsComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

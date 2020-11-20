import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCommentsComponent } from './list-comments.component';

describe('ListCommentsComponent', () => {
  let component: ListCommentsComponent;
  let fixture: ComponentFixture<ListCommentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommentsComponent ]
    })
    .compileComponents();
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

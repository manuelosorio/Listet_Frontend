import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListItemsComponent } from './list-items.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        ListItemsComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

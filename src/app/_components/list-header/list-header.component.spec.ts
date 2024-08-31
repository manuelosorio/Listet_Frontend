import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListHeaderComponent } from './list-header.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ListHeaderComponent', () => {
  let component: ListHeaderComponent;
  let fixture: ComponentFixture<ListHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        ListHeaderComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListDetailsComponent } from './list-details.component';
import { ListItemsComponent } from '../../_components/list-items/list-items.component';
import { ListCommentsComponent } from '../../_components/list-comments/list-comments.component';
import { ListHeaderComponent } from '../../_components/list-header/list-header.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FeatherComponent } from 'angular-feather';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ListDetailsComponent', () => {
  let component: ListDetailsComponent;
  let fixture: ComponentFixture<ListDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [FeatherComponent],
    imports: [RouterTestingModule,
        ListDetailsComponent,
        ListItemsComponent,
        ListCommentsComponent,
        ListHeaderComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

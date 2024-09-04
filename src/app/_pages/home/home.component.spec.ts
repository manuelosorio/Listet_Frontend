import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { IconsModule } from '../../_modules/icons/icons.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CanonicalService } from '../../shared/canonical.service';
import { provideRouter } from '@angular/router';
import { ListsService } from '../../_services/lists.service';
import { provideHttpClient } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HomeComponent, IconsModule],
        providers: [
          CanonicalService,
          ListsService,
          provideHttpClient(),
          provideHttpClientTesting(),
          provideRouter([]),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

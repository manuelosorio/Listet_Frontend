import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProfileComponent } from './profile.component';
import { IconsModule } from '../../_modules/icons/icons.module';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ProfileComponent, IconsModule],
        providers: [
          provideRouter([]),
          provideHttpClient(),
          provideHttpClientTesting(),
          {
            // Mock ActivatedRoute to provide necessary data for the test
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                params: {
                  username: 'mocked-user',
                },
                data: {
                  '0': { title: 'Listet App' },
                },
              },
              data: of({ '0': { title: 'Listet App' } }),
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have username', () => {
    expect(component.user).toBe('mocked-user');
  });
});

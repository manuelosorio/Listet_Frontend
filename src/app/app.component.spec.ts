import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CanonicalService } from './shared/canonical.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { UsersService } from './_services/users.service';
import { BehaviorSubject, of } from 'rxjs';
import { IconsModule } from './_modules/icons/icons.module';

describe('AppComponent', () => {
  let mockUserService: Partial<UsersService>;

  beforeEach(
    waitForAsync(() => {
      mockUserService = {
        authenticated$: new BehaviorSubject(true),
        userInfo$: new BehaviorSubject({
          username: 'testUser',
          firstName: 'Test',
          lastName: 'User',
        }),
        isAuth: jest.fn().mockReturnValue(of(true)),
      };
      TestBed.configureTestingModule({
        imports: [AppComponent, IconsModule],
        providers: [
          CanonicalService,
          provideRouter([]),
          provideHttpClientTesting(),
          { provide: UsersService, useValue: mockUserService },
        ],
      }).compileComponents();
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Listet'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Listet');
  });

  it('should call isAuth on ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(mockUserService.isAuth).toHaveBeenCalled();
  });
});

import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavComponent } from './_components/nav/nav.component';
import { AlertComponent } from './_components/alert/alert.component';
import { SearchComponent } from './_components/search/search.component';
import { FooterComponent } from './_components/footer/footer.component';
import { BackButtonComponent } from './_components/back-button/back-button.component';
import { RegisterComponent } from './_pages/register/register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IconsModule } from './_modules/icons/icons.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          AlertComponent,
          HttpClientTestingModule,
          IconsModule,
          FormsModule,
          CommonModule,
        ],
        declarations: [
          AppComponent,
          NavComponent,
          SearchComponent,
          FooterComponent,
          RegisterComponent,
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
});

import 'jest-preset-angular/setup-jest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IconsModule } from '@modules/icons/icons.module';

// Configure global testing setup
beforeAll(() => {
  TestBed.configureTestingModule({
    imports: [IconsModule],
    providers: [provideHttpClientTesting(), IconsModule],
  }).compileComponents();
});

import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IconsModule } from '@modules/icons/icons.module';

// Configure global testing setup
setupZoneTestEnv();
beforeAll(() => {
  TestBed.configureTestingModule({
    imports: [IconsModule],
    providers: [provideHttpClientTesting(), IconsModule],
  }).compileComponents();
});

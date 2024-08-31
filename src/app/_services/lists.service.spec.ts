import { TestBed } from '@angular/core/testing';

import { ListsService } from './lists.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ListsService', () => {
  let service: ListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

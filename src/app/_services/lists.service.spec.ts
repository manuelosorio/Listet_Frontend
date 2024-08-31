import { TestBed } from '@angular/core/testing';

import { ListsService } from './lists.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListsService', () => {
  let service: ListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

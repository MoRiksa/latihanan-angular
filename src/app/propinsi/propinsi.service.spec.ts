import { TestBed } from '@angular/core/testing';

import { PropinsiService } from './propinsi.service';

describe('PropinsiService', () => {
  let service: PropinsiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropinsiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

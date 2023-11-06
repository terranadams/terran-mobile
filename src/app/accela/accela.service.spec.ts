import { TestBed } from '@angular/core/testing';

import { AccelaService } from './accela.service';

describe('AccelaService', () => {
  let service: AccelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AplicationService } from './aplication.service';

describe('AplicacaoService', () => {
  let service: AplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

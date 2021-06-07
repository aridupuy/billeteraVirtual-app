import { TestBed } from '@angular/core/testing';

import { ValidacionMailService } from './validacion-mail.service';

describe('ValidacionMailService', () => {
  let service: ValidacionMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacionMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

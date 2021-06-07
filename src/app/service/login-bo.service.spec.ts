import { TestBed } from '@angular/core/testing';

import { LoginBoService } from './login-bo.service';

describe('LoginBoService', () => {
  let service: LoginBoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginBoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

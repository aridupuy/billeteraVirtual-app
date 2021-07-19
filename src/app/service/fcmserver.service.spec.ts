import { TestBed } from '@angular/core/testing';

import { FCMServerService } from './fcmserver.service';

describe('FCMServerService', () => {
  let service: FCMServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FCMServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Observable } from './observable';

describe('Observer', () => {
  let service: Observable;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Observable);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

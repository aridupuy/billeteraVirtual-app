import { TestBed } from '@angular/core/testing';

import { DestinatariosService } from './destinatarios.service';

describe('DestinatariosService', () => {
  let service: DestinatariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinatariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ObtenerDestinatariosService } from './obtener-destinatarios.service';

describe('ObtenerDestinatariosService', () => {
  let service: ObtenerDestinatariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerDestinatariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

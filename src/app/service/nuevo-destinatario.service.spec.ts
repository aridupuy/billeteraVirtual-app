import { TestBed } from '@angular/core/testing';

import { NuevoDestinatarioService } from './nuevo-destinatario.service';

describe('NuevoDestinatarioService', () => {
  let service: NuevoDestinatarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoDestinatarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

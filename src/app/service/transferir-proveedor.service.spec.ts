import { TestBed } from '@angular/core/testing';

import { TransferirProveedorService } from './transferir-proveedor.service';

describe('TransferirProveedorService', () => {
  let service: TransferirProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferirProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

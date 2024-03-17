import { TestBed } from '@angular/core/testing';

import { FormularioEstadoService } from './formulario-estado.service';

describe('FormularioEstadoService', () => {
  let service: FormularioEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

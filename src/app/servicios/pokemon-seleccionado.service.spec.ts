import { TestBed } from '@angular/core/testing';

import { PokemonSeleccionadoService } from './pokemon-seleccionado.service';

describe('PokemonSeleccionadoService', () => {
  let service: PokemonSeleccionadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonSeleccionadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

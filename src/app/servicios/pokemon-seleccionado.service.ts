import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonSeleccionadoService {
  private pokemonSeleccionadoSubject = new BehaviorSubject<Partial<Registro> | null>(null);
  private modoEdicionSubject = new BehaviorSubject<boolean>(false);
  public pokemonSeleccionado$ = this.pokemonSeleccionadoSubject.asObservable();
  public modoEdicion$ = this.modoEdicionSubject.asObservable();
  private idRegistroEdicionSubject = new BehaviorSubject<number | null>(null);
  public idRegistroEdicion$ = this.idRegistroEdicionSubject.asObservable();
  constructor() {}

  seleccionarPokemon(pokemon: Partial<Registro> | null, estaEditando: boolean = false): void {
    this.pokemonSeleccionadoSubject.next(pokemon);
    this.modoEdicionSubject.next(estaEditando);
  }

  seleccionarPokemons(pokemon: Partial<Registro> | null, estaEditando: boolean = true): void {
    this.pokemonSeleccionadoSubject.next(pokemon)
    this.modoEdicionSubject.next(estaEditando);
  }

  deseleccionarPokemon(): void {
    this.pokemonSeleccionadoSubject.next(null);
    this.modoEdicionSubject.next(false);
  }

  getPokemonSeleccionadoValue(): Partial<Registro> | null {
    return this.pokemonSeleccionadoSubject.getValue();
  }
}

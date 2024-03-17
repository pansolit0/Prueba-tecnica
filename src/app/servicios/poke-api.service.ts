import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { env } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private maxPokemonId = 898;

  constructor(private http: HttpClient) {}

  obtenerPokemonLista(limit: number): Observable<any[]> {
    const randomIds = Array.from({ length: limit }, () => Math.floor(Math.random() * this.maxPokemonId) + 1);

    const observables = randomIds.map(id => this.http.get<any>(`${env.apiConsultaEspecies}/${id}`).pipe(
      map(species => ({
        nombre: species.name,
        esLegendario: species.is_legendary,
        id: species.id,
        url: `${env.apiConsultaPokemon}/${species.id}`
      }))
    ));

    return forkJoin(observables);
  }

  obtenerDetallesPokemon(pokemonUrls: string[]): Observable<any[]> {
    const observables = pokemonUrls.map(url => {
      return this.http.get<any>(url).pipe(
        switchMap(pokemon => {
          return this.http.get<any>(`${env.apiConsultaEspecies}/${pokemon.id}`).pipe(
            map(species => {
              return {
                ...pokemon,
                tieneEvolucion: species.evolves_from_species != null
              };
            })
          );
        })
      );
    });

    return forkJoin(observables);
  }

  obtenerDetallesPokemonEspecifico(pokemonName: string): Observable<any> {
    return this.http.get<any>(`${env.apiConsultaEspecies}/${pokemonName}`).pipe(
      map(species => {
        return {
          esLegendario: species.is_legendary
        };
      })
    );
  }
}

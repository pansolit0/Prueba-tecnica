import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Registro } from '../../models/registro.model';

import { PokeapiService } from '../../servicios/poke-api.service';
import { PokemonSeleccionadoService } from '../../servicios/pokemon-seleccionado.service';



@Component({
  selector: 'app-lista-pokemon-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-pokemon-api.component.html',
  styleUrl: './lista-pokemon-api.component.css'
})
export class ListaPokemonComponent implements OnInit {
  pokemonLista: any[] = [];

  constructor(
    private servicioPokeapi: PokeapiService,
    private servicioPokemonSeleccionado: PokemonSeleccionadoService,
  ) {}

  ngOnInit(): void {
    this.obtenerListaPokemon();
  }

  obtenerListaPokemon(): void {
    this.servicioPokeapi.obtenerPokemonLista(30).subscribe(pokemon => {
      this.pokemonLista = pokemon;
    });
  }

  obtenerRandomRareza(): string {
    return (Math.random() * (1 - 0.1) + 0.1).toFixed(2);
  }



  atraparPokemon(pokemon: Registro): void {
    const rareza = this.obtenerRandomRareza();
    const pokemonRegistro: Registro = {
      nombre: pokemon.nombre,
      fechaAtrapado: new Date(),
      esLegendario: pokemon.esLegendario,
      rareza: +rareza,
    };

    this.servicioPokemonSeleccionado.seleccionarPokemon(pokemon, false);
  }
}

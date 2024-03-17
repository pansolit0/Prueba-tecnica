import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Registro } from '../../models/registro.model';

import { RegistroService } from '../../servicios/registro.service';
import { PokemonSeleccionadoService } from '../../servicios/pokemon-seleccionado.service';

import { FormularioRegistroComponent } from "../formulario-registro/formulario-registro.component";
import { FormularioEstadoService } from '../../servicios/formulario-estado.service';

@Component({
    selector: 'app-lista-registros',
    standalone: true,
    providers: [],
    templateUrl: './lista-registros.component.html',
    styleUrl: './lista-registros.component.css',
    imports: [CommonModule, FormularioRegistroComponent]
})
export class ListaRegistrosComponent implements OnInit {
  registrosAtrapados: Registro[] = [];

  constructor(
    private registroService: RegistroService,
    private pokemonSeleccionadoService: PokemonSeleccionadoService,
    private cd: ChangeDetectorRef,
    private formularioEstadoService: FormularioEstadoService,
  ) { }


  ngOnInit(): void {
    this.registroService.registros$.subscribe(registros => {
      this.registrosAtrapados = registros;
      this.cd.markForCheck();
    });
  }

  cargarRegistro(registro: Registro): void {
    this.pokemonSeleccionadoService.seleccionarPokemons(registro);
    this.formularioEstadoService.cambiarTitulo('Editar Registro'); // Cambia el título al editar

  }
  eliminarRegistro(registro: any): void {
    this.registroService.eliminarRegistro(registro.id);
  }
}

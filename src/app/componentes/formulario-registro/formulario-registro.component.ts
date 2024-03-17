import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Registro } from '../../models/registro.model';

import { RegistroService } from '../../servicios/registro.service';
import { FormularioEstadoService } from '../../servicios/formulario-estado.service';
import { PokemonSeleccionadoService } from '../../servicios/pokemon-seleccionado.service';



@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-registro.component.html',
  styleUrl: './formulario-registro.component.css'
})
export class FormularioRegistroComponent implements OnInit {
  registroForm: FormGroup;
  tituloFormulario: string  = 'Crear nuevo registro';
  modoEdicion: boolean = false;

  constructor(

    private fb: FormBuilder,
    private servicioRegistro: RegistroService,
    private servicioPokemonSeleccionado: PokemonSeleccionadoService,
    private formularioEstadoService: FormularioEstadoService
  ) {
    this.registroForm = this.fb.group({
      nombre: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],
      apodo: ['', Validators.maxLength(50)],
      fechaAtrapado: [{ value: new Date().toISOString().substring(0, 10), disabled: true }, Validators.required],
      descripcion: ['', Validators.maxLength(200)],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      esLegendario: [{ value: false, disabled: true }],
      rareza: [{ value: '', disabled: true }, Validators.required]
    });

    this.servicioPokemonSeleccionado.pokemonSeleccionado$.subscribe(pokemonSeleccionado => {
      if (pokemonSeleccionado) {
        this.modoEdicion = true;
        this.registroForm.patchValue({
          nombre: pokemonSeleccionado.nombre,
          esLegendario: pokemonSeleccionado.esLegendario,
          rareza: this.obtenerRandomRareza(),
        }, { emitEvent: false });
        this.registroForm.get('nombre')?.disable();
        this.tituloFormulario = this.tituloFormulario;
      } else {
        this.modoEdicion = false;
        this.registroForm.reset({
          fechaAtrapado: new Date().toISOString().substring(0, 10),
          cantidad: 1,
          esLegendario: false,
          rareza: this.obtenerRandomRareza()
        }, { emitEvent: false });
        this.registroForm.get('nombre')?.disable();
        this.tituloFormulario = 'Crear Nuevo Registro';
      }
    });
  }

  actualizarRegistro(): void {
    if (this.registroForm.valid) {
      const formValue = this.registroForm.value;
      const registroActualizado: Registro = {
        ...this.servicioPokemonSeleccionado.getPokemonSeleccionadoValue(),
        ...formValue
      };

      this.servicioRegistro.actualizarRegistro(registroActualizado as Registro);
      this.servicioPokemonSeleccionado.deseleccionarPokemon();
      this.registroForm.reset({
        fechaAtrapado: new Date().toISOString().substring(0, 10),
        cantidad: 1,
        esLegendario: false,
        rareza: ''
      });
      this.modoEdicion = false;
      this.servicioRegistro.actualizarRegistro(registroActualizado as Registro);
      this.reseteoFormulario();
    }
  }

  reseteoFormulario(): void {
    this.modoEdicion = false;
    this.servicioPokemonSeleccionado.deseleccionarPokemon();
    this.registroForm.reset({
      nombre: '',
      apodo: '',
      fechaAtrapado: new Date().toISOString().substring(0, 10),
      descripcion: '',
      cantidad: 1,
      esLegendario: false,
      rareza: this.obtenerRandomRareza()
    });
    this.registroForm.get('nombre')?.disable();
    this.registroForm.get('rareza')?.disable();
    this.tituloFormulario = this.tituloFormulario;
  }

  obtenerRandomRareza(): string {
    return (Math.random() * (1 - 0.1) + 0.1).toFixed(2);
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formValue = this.registroForm.getRawValue();
      const nombrePokemon = this.registroForm.get('nombre')?.value;
      if (!nombrePokemon) {
        alert('Debes seleccionar un Pokémon antes de crear un registro.');
        return;
      }

      if (this.registroForm.valid) {
      const nuevoRegistro: Registro = {
        id: -1,
        nombre: formValue.nombre,
        apodo: formValue.apodo,
        fechaAtrapado: new Date(formValue.fechaAtrapado),
        descripcion: formValue.descripcion,
        cantidad: formValue.cantidad,
        esLegendario: formValue.esLegendario,
        rareza: formValue.rareza
      };

      this.servicioRegistro.agregarRegistro(nuevoRegistro);
      this.servicioPokemonSeleccionado.seleccionarPokemon(null);
      this.registroForm.reset({
        fechaAtrapado: new Date().toISOString().substring(0, 10),
        cantidad: 1,
        esLegendario: [{ value: false, disabled: false }],
        rareza: ''
      });
      this.registroForm.get('nombre')?.disable();
      this.registroForm.get('esLegendario')?.disable();
    }
    }
  }



   ngOnInit(): void {
    this.formularioEstadoService.tituloFormulario$.subscribe(titulo => {
      this.tituloFormulario = titulo;
    });

    this.servicioPokemonSeleccionado.modoEdicion$.subscribe(modoEdicion => {
      this.modoEdicion = modoEdicion;
    });

    this.servicioPokemonSeleccionado.pokemonSeleccionado$.subscribe(pokemonSeleccionado => {
      if (pokemonSeleccionado) {
        this.modoEdicion = true;
        this.registroForm.patchValue({
          descripcion: pokemonSeleccionado.descripcion,
        }, { emitEvent: false });
      } else {
      }
    });
  }



}

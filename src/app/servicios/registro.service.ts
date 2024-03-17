import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private registrosSubject = new BehaviorSubject<Registro[]>(this.obtenerRegistrosLocalStorage());
  public registros$ = this.registrosSubject.asObservable();

  constructor() {

  }

  private obtenerRegistrosLocalStorage(): Registro[] {
    return JSON.parse(localStorage.getItem('registros') || '[]');
  }


  cargarRegistrosIniciales(): void {
    const registrosGuardados = JSON.parse(localStorage.getItem('registros') || '[]');
    this.registrosSubject.next(registrosGuardados);
  }


  obtenerRegistrosAtrapados(): Registro[] {
    return this.registrosSubject.value;
  }

  agregarRegistro(nuevoRegistro: Registro): void {
    const registrosActuales = this.registrosSubject.value;
    nuevoRegistro.id = registrosActuales.length + 1;
    this.registrosSubject.next([...registrosActuales, nuevoRegistro]);
    localStorage.setItem('registros', JSON.stringify([...registrosActuales, nuevoRegistro]));
  }



  refrescarRegistros(): Registro[] {
    return this.obtenerRegistrosAtrapados();
  }

  actualizarRegistro(registroActualizado: Registro): void {
    let registros = this.obtenerRegistrosAtrapados();
    const index = registros.findIndex(r => r.id === registroActualizado.id);
    if (index !== -1) {
      registros[index] = registroActualizado;
      this.registrosSubject.next(registros);
      // No olvides actualizar el local storage aquí si lo estás utilizando
    }
  }

  eliminarRegistro(id: number): void {
    let registros = this.obtenerRegistrosLocalStorage();
    registros = registros.filter(registro => registro.id !== id);
    this.guardarRegistrosEnLocalStorage(registros);
  }

  private guardarRegistrosEnLocalStorage(registros: Registro[]): void {
    localStorage.setItem('registros', JSON.stringify(registros));
    this.registrosSubject.next(registros);
  }
}

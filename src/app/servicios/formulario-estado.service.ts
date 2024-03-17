import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioEstadoService {
  private tituloFormularioSubject = new BehaviorSubject<string>('Crear Nuevo Registro');
  tituloFormulario$ = this.tituloFormularioSubject.asObservable();


  cambiarTitulo(titulo: string): void {
    this.tituloFormularioSubject.next(titulo);
  }
}

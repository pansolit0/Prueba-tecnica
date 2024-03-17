import {  Routes } from '@angular/router';

import { FormularioRegistroComponent } from './componentes/formulario-registro/formulario-registro.component';
import { IndexComponent } from './paginas/index/index.component';

export const routes: Routes = [


  { path: '', redirectTo: '/registros', pathMatch: 'full' }, // Ruta raiz

  //
  { path: 'registros', component: IndexComponent }, // Lista de todos los registros
  { path: 'crear', component: FormularioRegistroComponent }, // Formulario para crear un registro nuevo.
  { path: 'editar/:id', component: FormularioRegistroComponent } // Formulario para editar un registro ya hecho.


];

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

//servicios
import { RegistroService } from './servicios/registro.service';

//componentes
import { ListaRegistrosComponent } from "./componentes/lista-registros/lista-registros.component";
import { FormularioRegistroComponent } from "./componentes/formulario-registro/formulario-registro.component";



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, FormularioRegistroComponent, ListaRegistrosComponent],
    providers:[RegistroService]
})
export class AppComponent {
  title = 'web-app';
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioRegistroComponent } from "../../componentes/formulario-registro/formulario-registro.component";
import { ListaRegistrosComponent } from "../../componentes/lista-registros/lista-registros.component";

import { ListaPokemonComponent } from "../../componentes/lista-pokemon-api/lista-pokemon-api.component";
import { RegistroService } from '../../servicios/registro.service';


@Component({
    selector: 'app-index',
    standalone: true,
    providers: [RegistroService, CommonModule],
    templateUrl: './index.component.html',
    styleUrl: './index.component.css',
    imports: [FormularioRegistroComponent, ListaRegistrosComponent, ListaPokemonComponent]
})
export class IndexComponent {

}

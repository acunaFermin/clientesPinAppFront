import { Component } from '@angular/core';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { ClientesKpiComponent } from './clientes-kpi/clientes-kpi.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';

@Component({
  selector: 'app-root',
  imports: [NuevoClienteComponent, ClientesKpiComponent, ListaClientesComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  

}

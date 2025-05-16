import { Component } from '@angular/core';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { ClientesKpiComponent } from './clientes-kpi/clientes-kpi.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [NuevoClienteComponent, ClientesKpiComponent, ListaClientesComponent, MatCardModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  

}

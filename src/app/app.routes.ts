import { Routes } from '@angular/router';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';
import { ClientesKpiComponent } from './clientes-kpi/clientes-kpi.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'nuevo-cliente', pathMatch: 'full' },
  { path: 'nuevo-cliente', component: NuevoClienteComponent },
  { path: 'clientes-kpi', component: ClientesKpiComponent },
  { path: 'lista-clientes', component: ListaClientesComponent }
];
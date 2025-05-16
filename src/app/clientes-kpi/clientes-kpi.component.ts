import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'clientes-kpi',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './clientes-kpi.component.html',
  styleUrl: './clientes-kpi.component.scss'
})
export class ClientesKpiComponent {

}

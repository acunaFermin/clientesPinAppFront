import { Component } from '@angular/core';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';

@Component({
  selector: 'app-root',
  imports: [NuevoClienteComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  
}

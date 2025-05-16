import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppService, Kpis } from '../app.service';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'clientes-kpi',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './clientes-kpi.component.html',
  styleUrl: './clientes-kpi.component.scss'
})
export class ClientesKpiComponent implements OnInit {

  promedio: number = 0;
  desvio: number = 0;

  constructor(private readonly service: AppService) {

  }

  ngOnInit(): void {
    this.service.getClientesKpis()
    .pipe(
      take(1),
      catchError(err => of(err)),
      tap(resp => {
        if(resp instanceof HttpErrorResponse) {
          return;
        }

        this.promedio = Math.floor((resp as Kpis).promedio);
        this.desvio = Math.floor((resp as Kpis).desvio);
      })
    ).subscribe()
  }

}

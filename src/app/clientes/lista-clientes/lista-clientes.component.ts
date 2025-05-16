import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AppService, Cliente } from '../../app.service';
import { catchError, of, take, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../common/snackbar/snackbar.service';

@Component({
  selector: 'lista-clientes',
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss'
})
export class ListaClientesComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'edad',
    'fechaNacimiento',
    'fechaProbableMuerte',
  ];
  dataSource = new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly service: AppService,
    private readonly snackService: SnackbarService
  ) {

  }

  ngAfterViewInit() {
    this.service.getListaClientes()
    .pipe(
      take(1),
      catchError(err => of(err)),
      tap(resp => {
        if(resp instanceof HttpErrorResponse) {
          this.snackService.openSnackBarCustom({
            message: 'Ocurrió un error. No se pudieron recuperar los clientes.',
            type: 'error'
          });
          return;
        }

        this.dataSource = new MatTableDataSource<Cliente>((resp as Cliente[]).reverse());
        this.dataSource.paginator = this.paginator;
      })
    )
    .subscribe();
  }
}


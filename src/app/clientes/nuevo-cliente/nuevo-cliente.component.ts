import { Component } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {provideNativeDateAdapter} from '@angular/material/core';
import { NgIf } from '@angular/common';
import { AppService, Cliente } from '../../app.service';

import moment from 'moment';
import { catchError, of, take, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../common/snackbar/snackbar.service';


@Component({
  selector: 'nuevo-cliente',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf,
    MatIconModule, MatCardModule, MatButtonModule, MatDatepickerModule], 
  providers: [provideNativeDateAdapter()],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.scss'
})
export class NuevoClienteComponent {
  clienteForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: AppService,
    private readonly snackService: SnackbarService
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });

    this.clienteForm.get('fechaNacimiento')?.valueChanges.subscribe((fecha) => {
      if (fecha) {
        const edad = this.calcularEdad(fecha);
        this.clienteForm.get('edad')?.setValue(edad);
      }
    });
  }

  onSubmit(): void {
    this.clienteForm.markAllAsTouched();

    if (this.clienteForm.valid) {
      this.crearCliente();
      console.log('Formulario enviado con:', this.clienteForm.value);
    }
  }

  private crearCliente() {
    const fechaNacDatePicker = this.getFieldValue('fechaNacimiento');

    const newCliente: Cliente = {
      nombre: this.getFieldValue('nombre'),
      apellido: this.getFieldValue('apellido'),
      edad: this.getFieldValue('edad'),
      fechaNacimiento: moment(fechaNacDatePicker).format('DD/MM/YYYY'),
    }

    this.service.crearCliente(newCliente)
    .pipe(
      take(1),
      catchError(err => of(err)),
      tap(resp => {
        if(resp instanceof HttpErrorResponse) {
          this.snackService.openSnackBarCustom({
            message: 'Ocurrió un error. No se pudo guardar el cliente.',
            type: 'error'
          });
          return;  
        }

        this.snackService.openSnackBarCustom({
          message: 'Nuevo cliente guardado con éxito!',
          type: 'success'
        });

        this.resetFormCliente();
      })
    ).subscribe()
  }

  private resetFormCliente() {
    this.clienteForm.reset();
      
    Object.keys(this.clienteForm.controls).forEach(controlName => {
      const control = this.clienteForm.get(controlName);
      control?.clearValidators();
      control?.reset();
    });
  }

  private calcularEdad(fechaNac: Date | string): number {
    return moment().diff(moment(fechaNac), 'years');
  }

  private getFieldValue(fieldName: string) {
    return this.clienteForm.get(fieldName)?.value;
  }
}

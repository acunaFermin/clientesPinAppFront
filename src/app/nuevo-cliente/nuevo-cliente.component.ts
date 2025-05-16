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
import { AppService, Cliente } from '../app.service';

import moment from 'moment';
import { take, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


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
    private readonly service: AppService
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
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
      tap(resp => {
        if(resp instanceof HttpErrorResponse) {
          return;  
        }

        console.log({resp})
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

  private getFieldValue(fieldName: string) {
    return this.clienteForm.get(fieldName)?.value;
  }
}

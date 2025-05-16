import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly _api_url = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }


  getListaClientes() {
    return this.http.get<Cliente[]>(`${this._api_url}/listclientes`);
  }

  getClientesKpis() {
    return this.http.get<Kpis>(`${this._api_url}/kpideclientes`);
  }
}


export interface Cliente {
  id: number,
  nombre: string,
  apellido: string,
  edad: number,
  fechaNacimiento: string,
  fechaProbableMuerte: string,
}


export interface Kpis {
  promedio: number,
  desvio: number
}
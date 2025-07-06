import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GaleriaDiseno } from '../models/galeriadiseno';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class GaleriadisenoService {
  private url = `${base_url}/GaleriaDisenos`;
  private listaCambio = new Subject<GaleriaDiseno[]>();

  constructor(private http: HttpClient) { }

  listGaleriaDiseno() {
    return this.http.get<GaleriaDiseno[]>(`${this.url}/listarGaleriaDiseno`);
  }

  getListGaleriaDiseno(): Observable<GaleriaDiseno[]> {
    return this.listaCambio.asObservable();
  }
  
  setListGaleriaDiseno(listaNueva: GaleriaDiseno[]): void {
    this.listaCambio.next(listaNueva);
  }

  insert(galeriadiseno: GaleriaDiseno) {
    return this.http.post(`${this.url}/insertarGaleriaDiseno`, galeriadiseno);
  }

  updateGaleriaDiseno(galeriadiseno : GaleriaDiseno) {
    return this.http.put(`${this.url}/modificarGaleriaDiseno`, galeriadiseno);
  }
  
  deleteGaleriaDiseno(id: number) {
    return this.http.delete(`${this.url}/eliminarGaleriaDiseno/${id}`);
  }

  deleteByDisenoId(idDiseno: number) {
    return this.http.delete(`${this.url}/eliminarPorDiseno/${idDiseno}`);
  }
}

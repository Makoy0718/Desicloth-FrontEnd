import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Diseno } from '../models/diseno';
import { ComparacionPreciosDisenoDTO } from '../models/ComparacionPreciosDisenoDTO';
import { ConteoDisenoCategoriaOrigenDTO } from '../models/ConteoDisenoCategoriaOrigenDTO';
import { GeneroCantidad } from '../models/generoCantidad';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class DisenoService {
  private url = `${base_url}/Disenos`;
  private listaCambio = new Subject<Diseno[]>();

  constructor(private http: HttpClient) {}

  listDiseno() {
    return this.http.get<Diseno[]>(`${this.url}/listarDiseno`);
  }

  listIdDiseno(id: number) {
    return this.http.get<Diseno>(`${this.url}/detallarDiseno/${id}`);
  }

  listByUserIdDiseno(id: number): Observable<Diseno[]> {
    return this.http.get<Diseno[]>(
      `${this.url}/buscarPorIDUserDiseno?idUser=${id}`
    );
  }

  getListDiseno(): Observable<Diseno[]> {
    return this.listaCambio.asObservable();
  }

  setListDiseno(listaNueva: Diseno[]): void {
    this.listaCambio.next(listaNueva);
  }

  insertDiseno(diseno: Diseno): Observable<Diseno> {
    return this.http.post<Diseno>(`${this.url}/insertarDiseno`, diseno);
  }

  updateDiseno(diseno: Diseno) {
    return this.http.put(`${this.url}/modificarDiseno`, diseno);
  }

  deleteDiseno(id: number) {
    return this.http.delete(`${this.url}/eliminarDiseno/${id}`);
  }

  getAvrgPreciosDiseno(): Observable<ComparacionPreciosDisenoDTO[]> {
    return this.http.get<ComparacionPreciosDisenoDTO[]>(
      `${this.url}/compararPreciosOrigenDiseno`
    );
  }

  getConteoDisenosPorCategoriaYOrigen(): Observable<
    ConteoDisenoCategoriaOrigenDTO[]
  > {
    return this.http.get<ConteoDisenoCategoriaOrigenDTO[]>(
      `${this.url}/conteoDisenosPorCategoriaYOrigenDiseno`
    );
  }

  getDisenosRecientes(): Observable<Diseno[]> {
    return this.http.get<Diseno[]>(`${this.url}/buscarRecientesDiseno`);
  }

  getCantidadPorGenero(): Observable<GeneroCantidad[]> {
    return this.http.get<GeneroCantidad[]>(`${this.url}/conteoDisenosPorGenero`);
  }
}

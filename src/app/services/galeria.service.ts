import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Galeria } from '../models/galeria';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  private url = `${base_url}/Galeria`;  
  
  private listaCambio = new Subject<Galeria[]>();

  constructor(private http: HttpClient) { }

  list() {
      return this.http.get<Galeria[]>(`${this.url}/listarGaleria`);
  }

  insert(g: Galeria) {
      return this.http.post(`${this.url}/insertarGaleria`, g);
    }
  
    setList(listaNueva: Galeria[]) {
      this.listaCambio.next(listaNueva);
    }
  
    getList() {
      return this.listaCambio.asObservable();
    }
  
    listId(id: number) {
      return this.http.get<Galeria>(`${this.url}/${id}`);
    }
  
    update(g: Galeria) {
      return this.http.put(`${this.url}/modificarGaleria`, g);
    }
  
    deleteA(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
  
}

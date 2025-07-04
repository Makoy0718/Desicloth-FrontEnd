import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Genero } from '../models/genero';
import { Subject } from 'rxjs';


const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class GeneroService {
  private url = `${base_url}/generos`;

  private listaCambio = new Subject<Genero[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Genero[]>(`${this.url}/lista`);
  }
  insert(a: Genero) {
    return this.http.post(`${this.url}/creacion`, a);
  }
  setList(listaNueva: Genero[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Genero>(`${this.url}/ver/${id}`);
  }

  update(a: Genero) {
    return this.http.put(`${this.url}/edicion`, a);
  }

  deleteGe(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Reclamo } from '../models/reclamo';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ReclamoService {
  private url = `${base_url}/reclamos`;

  private listaCambio = new Subject<Reclamo[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Reclamo[]>(`${this.url}/listarReclamos`);
  }
  insert(a: Reclamo) {
    return this.http.post(`${this.url}/insertarReclamos`, a);
  }
  setList(listaNueva: Reclamo[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Reclamo>(`${this.url}/${id}`);
  }

  update(a: Reclamo) {
    return this.http.put(`${this.url}/modificarReclamo`, a);
  }

  deleteRec(id: number) {
    return this.http.delete(`${this.url}/eliminarReclamo/${id}`);
  }
}

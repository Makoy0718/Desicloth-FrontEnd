import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { Observable, Subject } from 'rxjs';
import { ConteoDisenosPorCategoriaDTO } from '../models/ConteoDisenosPorCategoriaDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url = `${base_url}/Categorias`;  

  private listaCambio = new Subject<Categoria[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Categoria[]>(`${this.url}/listarCategoria`);
  }

  insert(c: Categoria) {
    return this.http.post(`${this.url}/insertarCategoria`, c);
  }

  setList(listaNueva: Categoria[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Categoria>(`${this.url}/${id}`);
  }

  update(c: Categoria) {
    return this.http.put(`${this.url}/modificarCategoria`, c);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/eliminarCategoria/${id}`);
  }

  searchByName(name: string): Observable<Categoria[]> {
    const params = new HttpParams().set('c', name);
    return this.http.get<Categoria[]>(`${this.url}/buscarPorNombreCategoría`, { params });
  }

  getConteoDisenosPorCategoria(): Observable<ConteoDisenosPorCategoriaDTO[]> {
    return this.http.get<ConteoDisenosPorCategoriaDTO[]>(`${this.url}/contarDisenos`);
  }

}

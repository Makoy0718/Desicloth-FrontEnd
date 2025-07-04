import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

//RUTAS del backend

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private url = `${base_url}/Producto`;
  private listaCambio = new Subject<Producto[]>();

  constructor(private http: HttpClient) {}
  //GET /Producto/listaProducto

  
  list() {
    return this.http.get<Producto[]>(`${this.url}/listaProducto`);
  }

  //post/producto/insertarProducto
  insert(producto:Producto): Observable<any> {
    return this.http.post(`${this.url}/insertarProducto`, producto);
  }

  //GET /Producto/{id}-buscar producto por ID
  listId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }
 
  //DELETE /Producto/{id}-eliminar producto por ID
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  //GET /Producto/buscartipoProducto?tipoProducto=XYZ-buscar por tipo
  searchByTipo(tipo: string): Observable<Producto[]> {
    const params = {tipoProducto: tipo };
    return this.http.get<Producto[]>(`${this.url}/buscartipoProducto`, {params });
  }
  //GET /Producto/buscartallaProducto?tallaProducto=XYZ-buscar por talla
  searchByTalla(talla:string):Observable<Producto[]> {
    const params = {tallaProducto: talla };
    return this.http.get<Producto[]>(`${this.url}/buscartallaProducto`, {params});
  }

  //GET /Producto/precioPromedioPorTalla
   precioPromedioPorTalla(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/precioPromedioPorTalla`);
  }

  // Para notificar cambios en la lista-usdo para actualizar listas automaticamente en el frontend
  getList(): Observable<Producto[]> {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Producto[]): void {
    this.listaCambio.next(listaNueva);
  }
}

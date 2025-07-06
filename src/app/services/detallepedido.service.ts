import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DetallePedido } from '../models/detallepedido';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DetallepedidoService {
  private url =`${base_url}/DetallePedido`;
  private listaCambio=new Subject<DetallePedido[]>();

  constructor(private http:HttpClient){}
  listDetallePedido(){
    return this.http.get<DetallePedido[]>(`${this.url}/listarDetallePedido`);
  }

  insert(detallepedidonuv: DetallePedido){
    return this.http.post(`${this.url}/insertarDetallePedido`,detallepedidonuv);
  }

  updateDetallePedido(detallepedidomod:DetallePedido){
    return this.http.put(`${this.url}/modificarDetallePedido`,detallepedidomod);
  }

  deleteDetallePedido(id:number){
    return this.http.delete(`${this.url}/eliminarDetallePedido/${id}`);
  }

  setListDetallePedido(listaNueva:DetallePedido[]):void{
    this.listaCambio.next(listaNueva);
  }
  getListDetallePedido(){
    return this.listaCambio.asObservable();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pedido } from '../models/pedido';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  private url = `${base_url}/Pedidos`;

  private listaCambio = new Subject <Pedido[]>();

  constructor(private http: HttpClient ) {}

  listPedido(){
    return this.http.get<Pedido[]>(`${this.url}/listarPedido`)
  }
  insertPedido(pednuv: Pedido){
    return this.http.post(`${this.url}/insertarPedido`,pednuv);
  }

  updatePedido(pedmod: Pedido){
    return this.http.put(`${this.url}/modificarPedido`,pedmod);
  }

  deletePedido(id:number){
    return this.http.delete(`${this.url}/eliminarPedido/${id}`)
  }

  setListPedido(listaNueva: Pedido[]){
    this.listaCambio.next(listaNueva);
  }

  getListPedido(){
    return this.listaCambio.asObservable();
  }

  listIdPedido(id:number){
    return this.http.get<Pedido>(`${this.url}/buscarPedido/${id}`)
  }
}

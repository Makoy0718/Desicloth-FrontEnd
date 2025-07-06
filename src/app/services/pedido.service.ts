import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pedido } from '../models/pedido';
import { Observable, Subject } from 'rxjs';

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
  insertPedido(pedido: Pedido):Observable<Pedido> {
    return this.http.post<Pedido>(`${this.url}/insertarPedido`,pedido);
  }

  updatePedido(pedido: Pedido){
    return this.http.put(`${this.url}/modificarPedido`,pedido);
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
  //METODOS PARA BUSCAR
  //busca por fecha
  //BuscarPorFecha(fecha: Date):Observable<Pedido[]>{
    //const fechaISO=fecha.toISOString().split('T')[0];//Formato yyyy-MM-dd
    //const params = new HttpParams().set('fecha', fechaISO);//AQUI va la fecha
    //return this.http.get<Pedido[]>(`${this.url}/buscarPorFecha`, {params});
  //}

}

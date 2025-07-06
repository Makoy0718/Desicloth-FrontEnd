import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pago } from '../models/pago';
import { Observable, Subject } from 'rxjs';
import { Pedido } from '../models/pedido';
import { UsuarioMontoDTO } from '../models/UsuarioMontoDTO';


const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private url: string = `${base_url}/Pagos`;

  private listaCambio =new Subject <Pago[]>();

  constructor(private http: HttpClient) {}

  listPago() {
    return this.http.get<Pago[]>(`${this.url}/listarPago`);
  }

  insertPago(pago: Pago): Observable<void> {
    return this.http.post<void>(`${this.url}/insertarPago`, pago);
  }

  updatePago(pago: Pago): Observable<void> {
    return this.http.put<void>(`${this.url}/modificarPago`, pago);
  }

  deletePago(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminarPago/${id}`);
  }

  setListPago(listaNueva: Pago[]){
    this.listaCambio.next(listaNueva);
  }

  getListPago(){
    return this.listaCambio.asObservable();
  }

  listIdPago(id:number){
    return this.http.get<Pago>(`${this.url}/buscarPago/${id}`)
  }

  //metodos para hacer el componte en buscar 
  buscarPorMetodo(metodo:string): Observable<Pago[]>{
    const params = new HttpParams().set('metodo',metodo);
    return this.http.get<Pago[]>(`${this.url}/buscarPorMetodo`, {params});
  }
  //query1:top 5 pagos mas altos:
  obtenerTop5Pagos():Observable<Pago[]>{
    return this.http.get<Pago[]>(`${this.url}/top5pagos`)
  }
   
  //quer2:obtener total de pagos por usuario
  obtenerTotalPagosPorUsuario():Observable<UsuarioMontoDTO[]>{
    return this.http.get<UsuarioMontoDTO[]>(`${this.url}/totalPorUsuario`)
  }


  
}





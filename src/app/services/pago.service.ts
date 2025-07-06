import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pago } from '../models/pago';
import { Observable, Subject } from 'rxjs';


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

  insertPago(pagnuv: Pago): Observable<void> {
    return this.http.post<void>(`${this.url}/insertarPago`, pagnuv);
  }

  updatePago(pagmod: Pago): Observable<void> {
    return this.http.put<void>(`${this.url}/modificarPago`, pagmod);
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

  
}





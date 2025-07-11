import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Galeria } from '../models/galeria';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RaitingDTO } from '../models/RaitingDTO';
import { GaleriasConIA } from '../models/galeriasconIA';
import { TotalGalerias } from '../models/totalgalerias';


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

  getGaleriaByUsername(username: string) {
    const params = new HttpParams().set('nombre', username);
    return this.http.get<Galeria[]>(`${this.url}/buscarPorNombreUsuario`, { params });
  }

  searchByName(name: string): Observable<Galeria[]> {
    const params = new HttpParams().set('nombre', name);
    return this.http.get<Galeria[]>(`${this.url}/buscarPorNombre`, { params });
  }

  getAverageRating(idGaleria: number): Observable<RaitingDTO> { 
    return this.http.get<RaitingDTO>(`${this.url}/galerias/${idGaleria}/rating-promedio`);
  }
  
  getTotalGalerias(): Observable<TotalGalerias> {
    return this.http.get<TotalGalerias>(`${this.url}/total`);
  }
  
  getGaleriasConIA(): Observable<GaleriasConIA> {
    return this.http.get<GaleriasConIA>(`${this.url}/ia`);
  }

}

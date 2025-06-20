import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.base;


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = `${base_url}/roles`;

  private listaCambio=new Subject<Role[]>()
  constructor(private http: HttpClient){}

  list(){
    return this.http.get<Role[]>(`${this.url}/lista`);
  }
  insert(r:Role){
    return this.http.post(`${this.url}/crearRol`,r)
  }
  setList(listaNueva:Role[]){
    this.listaCambio.next(listaNueva)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.url}/lista`);
  }
}

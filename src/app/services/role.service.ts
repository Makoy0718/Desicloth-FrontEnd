import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
    return this.http.get<Role[]>(this.url);
  }
  insert(r:Role){
    return this.http.post(this.url,r)
  }
  setList(listaNueva:Role[]){
    this.listaCambio.next(listaNueva)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
}

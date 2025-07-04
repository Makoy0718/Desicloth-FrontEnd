import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Users } from '../models/users';


const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = `${base_url}/usuarios`;

  private listaCambio = new Subject<Users[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Users[]>(`${this.url}/listarUsuarios`);
  }
  
  insert(a: Users) {
    return this.http.post(`${this.url}/insertarUsuario`, a);
  }
  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Users>(`${this.url}/buscarUsuario/${id}`);
  }

  update(a: Users) {
    return this.http.put(`${this.url}/modificarUsuario`, a);
  }

  deleteU(id: number) {
    return this.http.delete(`${this.url}/eliminarUsuario/${id}`);
  }

  updateRole(a: Users, idRol: number ) {
    const params = new HttpParams().set('idRole', idRol);
    return this.http.put(`${this.url}/modificarRol`, a);
  }

  
  searchUserByName(username: string){
    return this.http.get<Users>(`${this.url}/buscarPorNombreUsuario/${username}`);
  }
}

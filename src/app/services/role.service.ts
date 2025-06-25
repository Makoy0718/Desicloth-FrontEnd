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

	listRole(){
		return this.http.get<Role[]>(`${this.url}/lista`);
	}
	insertRole(role:Role){
		return this.http.post(`${this.url}/crearRol`,role)
	}
	setList(listaNueva:Role[]){
		this.listaCambio.next(listaNueva)
	}
	getList(){
		return this.listaCambio.asObservable()
	}

	listId(id: number) {
    	return this.http.get<Role>(`${this.url}/verRol/${id}`);
  	}

	deleteRole(id: number) {
		return this.http.delete(`${this.url}/${id}`);
  	}

	updateRole(role: Role) {
		return this.http.put(`${this.url}/modificarRol`, role);
	}
}

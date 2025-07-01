import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Diseno } from '../models/diseno';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DisenoService {
	private url = `${base_url}/Disenos`; 
	private listaCambio = new Subject<Diseno[]>();

	constructor(private http: HttpClient) { }

	listDiseno() {
		return this.http.get<Diseno[]>(`${this.url}/listaDiseno`);
	}

	listIdDiseno(id: number) {
		return this.http.get<Diseno>(`${this.url}/verDiseno/${id}`);
	}

	getListDiseno(): Observable<Diseno[]> {
		return this.listaCambio.asObservable();
	}

	setListDiseno(listaNueva: Diseno[]): void {
		this.listaCambio.next(listaNueva);
	}

	insertDiseno(diseno: Diseno): Observable<any> {
		return this.http.post(`${this.url}/insertarDiseno`, diseno);
	}

	updateDiseno(diseno: Diseno) {
    	return this.http.put(`${this.url}/modificarDiseno`, diseno);
  	}

	deleteDiseno(id: number) {
      return this.http.delete(`${this.url}/eliminarDiseno/${id}`);
    }
}

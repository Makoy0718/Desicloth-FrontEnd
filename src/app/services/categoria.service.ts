import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url = `${base_url}/categoria`;

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Categoria[]>(this.url);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private url = `${base_url}/producto`;

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Producto[]>(this.url);
  }
}

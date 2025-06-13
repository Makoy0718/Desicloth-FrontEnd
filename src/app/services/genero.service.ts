import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Genero } from '../models/genero';


const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class GeneroService {
  private url = `${base_url}/genero`;

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Genero[]>(this.url);
  }
}

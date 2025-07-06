import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from './users.service';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private userService: UsersService) {}

  //Encargado de entrar al backend al controlador de login de seguridad
  login(request: JwtRequest) {
    return this.http.post('http://localhost:8085/login', request);
  }

  //Revisa si la sesion actual cuenta con un toke (Osea si se inicio sesion)
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  //Muestra el rol que contiene el token
  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }

  //Muestra el id que contiene el token
  showUsername() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log('Contenido completo del token:', decodedToken);
    return decodedToken?.id || decodedToken?.sub || null;
  }
}

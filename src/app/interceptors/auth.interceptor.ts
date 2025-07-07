import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtén el token de donde lo tengas guardado (localStorage o sessionStorage)
    const token = sessionStorage.getItem('token');

    // Si no hay token, continúa la petición normal
    if (!token) {
      return next.handle(req);
    }

    // Clona la petición y agrega el header Authorization con el token
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Continúa con la petición clonada (con token)
    return next.handle(authReq);
  }
}

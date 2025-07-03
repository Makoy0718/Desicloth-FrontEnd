import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [MatMenuModule, MatIconModule,MatToolbarModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  //Rol del usuario que inicio sesion
  role: string = '';
  id: number = 0;

  constructor(private loginService: LoginService) {}

  //Limpia el token y los datos de la sesion actual
  cerrar() {
    sessionStorage.clear();
  }

  //Llamamos el metodo para mostrar el rol y luego llama al metodo para verificar si hay un token
  verificar() {
    this.role = this.loginService.showRole();
    this.id = this.loginService.showUserId();
    return this.loginService.verificar();
  }

  //Checa si el rol traido coincide con ADMIN
  isAdmin() {
    return this.role === 'ADMIN';
  }

  //Checa si el rol traido coincide con CLIENTE
  isCliente() {
    return this.role === 'CLIENTE';
  }
}

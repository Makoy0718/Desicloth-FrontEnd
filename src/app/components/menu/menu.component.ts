import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-menu',
  imports: [MatMenuModule, MatIconModule,MatToolbarModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  //Rol del usuario que inicio sesion
  role: string = '';
  user: string = '';
  id: number = 0;

  usuarioVerificado : boolean = false

  constructor(private loginService: LoginService, private userService: UsersService) {}

  //Limpia el token y los datos de la sesion actual
  cerrar() {
    sessionStorage.clear();
  }

  //Llamamos el metodo para mostrar el rol y luego llama al metodo para verificar si hay un token
  verificar() {
    this.role = this.loginService.showRole();
    this.user = this.loginService.showUsername();
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

  obtenerIdUsuario() {
    const username = this.loginService.showUsername();

    this.userService.searchUserByName(username).subscribe({
      next: (user) => {
        this.id = user.idUser; // Aquí asignas el id que venga del usuario
      }
    });
    
  }
}

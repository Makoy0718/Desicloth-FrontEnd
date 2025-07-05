import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';

import { Diseno } from '../../../models/diseno';
import { DisenoService } from '../../../services/diseno.service';
import { UsersService } from '../../../services/users.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-misdisenos',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
  ],
  templateUrl: './misdisenos.component.html',
  styleUrl: './misdisenos.component.css'
})
export class MisdisenosComponent implements OnInit {
  disenos: Diseno[] = [];
  disenosFiltrados: Diseno[] = [];

  categorias: any[] = [];
  generos: any[] = [];
  categoriaSeleccionada: string | null = null;
  generoSeleccionado: string | null = null;

  pageSize = 3;
  paginaActual = 0;

  role: string = '';
  user: any;
  idUser: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private disenoService: DisenoService,
    private loginService: LoginService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.obtenerDisenosDelUsuario();
  }

  obtenerDisenosDelUsuario(): void {
    const username = this.loginService.showUsername();
    this.usersService.searchUserByName(username).subscribe({
      next: (user) => {
        this.user = user.username;
        this.idUser = user.idUser
        console.log(this.user)
        this.disenoService.listByUserIdDiseno(this.idUser).subscribe((data) => {
          this.disenos = data;
          this.disenosFiltrados = data;
          this.extraerCategoriasYGeneros();
        });
      }
    });
  }

  extraerCategoriasYGeneros() {
    this.categorias = [...new Set(this.disenos.map(d => d.categoria.nombreCategoria))].map(nombre => ({ nombreCategoria: nombre }));
    this.generos = [...new Set(this.disenos.map(d => d.genero.nombreGenero))].map(nombre => ({ nombreGenero: nombre }));
  }

  filtrarDisenos() {
    this.disenosFiltrados = this.disenos.filter(diseno => {
      const coincideCategoria = !this.categoriaSeleccionada || diseno.categoria.nombreCategoria === this.categoriaSeleccionada;
      const coincideGenero = !this.generoSeleccionado || diseno.genero.nombreGenero === this.generoSeleccionado;
      return coincideCategoria && coincideGenero;
    });

    this.paginaActual = 0;

    if (this.paginator) {
      this.paginator.pageIndex = 0;
      this.paginator._changePageSize(this.paginator.pageSize);
    }
  }

  get disenosPaginados(): Diseno[] {
    const start = this.paginaActual * this.pageSize;
    const end = start + this.pageSize;
    return this.disenosFiltrados.slice(start, end);
  }

  cambiarPagina(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.paginaActual = event.pageIndex;
  }

  eliminarDiseno(id: number) {
    this.disenoService.deleteDiseno(id).subscribe(() => {
      this.obtenerDisenosDelUsuario();
    });
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }

  isCliente() {
    return this.role === 'CLIENTE';
  }
}

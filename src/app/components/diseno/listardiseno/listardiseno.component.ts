import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Diseno } from '../../../models/diseno';
import { DisenoService } from '../../../services/diseno.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LoginService } from '../../../services/login.service';
import { GaleriadisenoService } from '../../../services/galeriadiseno.service';

@Component({
  selector: 'app-listardiseno',
  imports: [
	MatTableModule, CommonModule, 
	MatCardModule, MatButtonModule, 
	RouterLink, MatIconModule, 
	MatFormFieldModule, MatSelectModule, 
	MatOptionModule, MatPaginatorModule,
	],
  templateUrl: './listardiseno.component.html',
  styleUrl: './listardiseno.component.css'
})
export class ListardisenoComponent implements OnInit{
	disenos: Diseno[] = [];
  	disenosFiltrados: Diseno[] = [];

	categorias: any[] = [];
	generos: any[] = [];

	categoriaSeleccionada: string | null = null;
	generoSeleccionado: string | null = null;

	pageSize = 3;
	paginaActual = 0;

	role: string = '';

	constructor(private disenoService: DisenoService, private loginService: LoginService, 
		private galeriadisenoService: GaleriadisenoService
	) {}

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	ngOnInit(): void {
    	this.disenoService.listDiseno().subscribe(data => {
			this.disenos = data;
			this.disenosFiltrados = data;
			this.extraerCategoriasYGeneros();
		});

		// Escucha cambios cuando se actualiza la lista desde otro componente
		this.disenoService.getListDiseno().subscribe(data => {
			this.disenos = data;
			this.filtrarDisenos(); // aplica los filtros con la nueva lista
			this.extraerCategoriasYGeneros(); // actualiza las opciones de filtro
		});

  this.verificar();
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
			this.paginator.pageIndex = 0; // ✅ <- clave
			this.paginator._changePageSize(this.paginator.pageSize); // fuerza redibujo
		}
	}

	// Función para obtener solo los diseños visibles en la página actual
	get disenosPaginados(): Diseno[] {
		const start = this.paginaActual * this.pageSize;
		const end = start + this.pageSize;
		return this.disenosFiltrados.slice(start, end);
	}

	// Captura el evento de cambio de página del paginador
	cambiarPagina(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.paginaActual = event.pageIndex;
	}

	eliminarDiseno(id: number) {
		// Primero elimina todos los GaleriaDiseno asociados a este diseño
		this.galeriadisenoService.deleteByDisenoId(id).subscribe(() => {
			// Luego elimina el diseño en sí
			this.disenoService.deleteDiseno(id).subscribe(() => {
			// Y actualiza la lista global
			this.disenoService.listDiseno().subscribe((data) => {
				this.disenoService.setListDiseno(data);
			});
			});
		});
  	}

	//Llamamos el metodo para mostrar el rol y luego llama al metodo para verificar si hay un token
	verificar() {
		this.role = this.loginService.showRole();
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

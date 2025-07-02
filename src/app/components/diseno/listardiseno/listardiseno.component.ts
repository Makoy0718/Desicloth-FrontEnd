import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-listardiseno',
  imports: [
	MatTableModule, CommonModule, 
	MatCardModule, MatButtonModule, 
	RouterLink, MatIconModule, 
	MatFormFieldModule, MatSelectModule, 
	MatOptionModule, MenuComponent],
  templateUrl: './listardiseno.component.html',
  styleUrl: './listardiseno.component.css'
})
export class ListardisenoComponent {
	disenos: Diseno[] = [];
  	disenosFiltrados: Diseno[] = [];

	categorias: any[] = [];
	generos: any[] = [];

	categoriaSeleccionada: string | null = null;
	generoSeleccionado: string | null = null;

	

	constructor(private disenoService: DisenoService) {}

	ngOnInit(): void {
    	this.disenoService.listDiseno().subscribe(data=>{
      		this.disenos = data;
      		//this.dataSource=new MatTableDataSource(data)
    	})

		this.disenoService.getListDiseno().subscribe((data) => {
			this.disenos = data;
      		//this.dataSource = new MatTableDataSource(data);
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
	}

	eliminarDiseno(id: number) {
    	this.disenoService.deleteDiseno(id).subscribe((data) => {
      		this.disenoService.listDiseno().subscribe((data) => {
        		this.disenoService.setListDiseno(data);
      		});
    	});
  	}
}

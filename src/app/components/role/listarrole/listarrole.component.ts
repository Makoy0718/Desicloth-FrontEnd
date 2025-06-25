import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-listarrole',
  imports: [MatTableModule, CommonModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listarrole.component.html',
  styleUrl: './listarrole.component.css'
})
export class ListarroleComponent {
	dataSource: MatTableDataSource<Role> = new MatTableDataSource();
	displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

	constructor(private rS: RoleService) {}

	ngOnInit(): void {
		
    	this.rS.listRole().subscribe((data) => {
      		this.dataSource = new MatTableDataSource(data);
    	});
    	this.rS.getList().subscribe((data) => {
      		this.dataSource = new MatTableDataSource(data);
    	});
  	}

	eliminar(id: number) {
    	this.rS.deleteRole(id).subscribe((data) => {
      		this.rS.listRole().subscribe((data) => {
        		this.rS.setList(data);
      		});
    	});
  	}
}

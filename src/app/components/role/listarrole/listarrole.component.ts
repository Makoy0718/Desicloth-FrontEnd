import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-listarrole',
  imports: [
    MatTableModule, CommonModule,
    MatButtonModule, RouterLink,
    MatIconModule, MenuComponent
  ],
  templateUrl: './listarrole.component.html',
  styleUrl: './listarrole.component.css'
})
export class ListarroleComponent implements OnInit {
	dataSource: MatTableDataSource<Role> = new MatTableDataSource();
	displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

	constructor(private roleService : RoleService){}

	ngOnInit(): void {
		this.roleService.list().subscribe((data) => {
		this.dataSource = new MatTableDataSource(data);
		});
		this.roleService.getList().subscribe((data) => {
		this.dataSource = new MatTableDataSource(data);
		});
  	}

	eliminar(id: number) {
		this.roleService.deleteRole(id).subscribe((data) => {
			this.roleService.list().subscribe((data) => {
				this.roleService.setList(data);
			});
		});
  	}
}

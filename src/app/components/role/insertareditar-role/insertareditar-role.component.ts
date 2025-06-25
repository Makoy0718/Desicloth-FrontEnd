import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../models/role';
import { Router } from 'express';
import { RoleService } from '../../../services/role.service';


@Component({
  selector: 'app-insertareditar-role',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditar-role.component.html',
  styleUrl: './insertareditar-role.component.css'
})
export class InsertareditarRoleComponent {
	form: FormGroup = new FormGroup({});
	roles: Role = new Role();

	id: number = 0;
  	edicion: boolean = false;

	constructor( private rS: RoleService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.params.subscribe((data: Params) => {
			this.id = data['id'];
			this.edicion = data['id'] != null;
			//actualizar trae data
			this.init();
		});

		this.form = this.formBuilder.group({
		codigo: [''],
		nombre: ['', Validators.required],
		descripcion: ['', Validators.required],
		});
  	}

	aceptar() {
    	console.log(this.form.value)
		if (this.form.valid) {
			this.roles.idRole = this.form.value.codigo;
			this.roles.nombreRole = this.form.value.nombre;
			this.roles.descripcionRole = this.form.value.descripcion;

			if (this.edicion) {
				//actualizar
				this.rS.updateRole(this.roles).subscribe(() => {
					this.rS.listRole().subscribe((data) => {
						this.rS.setList(data);
					});
				});
			} else {
				//insertar
				this.rS.insertRole(this.roles).subscribe(() => {
					this.rS.listRole().subscribe((data) => {
						this.rS.setList(data);
					});
				});
			}
			//this.router.navigate(['rutausers']);
		}
  	}
	
	init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRole),
          nombre: new FormControl(data.nombreRole),
          descripcion: new FormControl(data.descripcionRole),
        });
      });
    }
	}
}

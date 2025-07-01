import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-insertareditarrole',
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
  templateUrl: './insertareditarrole.component.html',
  styleUrl: './insertareditarrole.component.css'
})
export class InsertareditarroleComponent implements OnInit {
	form: FormGroup = new FormGroup({});
	role: Role = new Role();

	id: number = 0;
  	edicion: boolean = false;

	constructor(
		private rS: RoleService,
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute
	) {}

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
		console.log(this.form.value);
		if (this.form.valid) {
			this.role.idRole = this.form.value.codigo;
			this.role.nombreRole = this.form.value.nombre;
			this.role.descripcionRole = this.form.value.descripcion;
			if (this.edicion) {
				//actualizar
				this.rS.updateRole(this.role).subscribe(() => {
				this.rS.list().subscribe((data) => {
					this.rS.setList(data);
				});
				});
			} else {
				//insertar
				this.rS.insert(this.role).subscribe(() => {
				this.rS.list().subscribe((data) => {
					this.rS.setList(data);
				});
				});
			}
			this.router.navigate(['rutarole']);
		}
  	}

	init() {
		if (this.edicion) {
			this.rS.listIdRole(this.id).subscribe((data) => {
				this.form = new FormGroup({
					codigo: new FormControl(data.idRole),
					nombre: new FormControl(data.nombreRole),
					correo: new FormControl(data.descripcionRole),
				});
			});
		}
  	}
}

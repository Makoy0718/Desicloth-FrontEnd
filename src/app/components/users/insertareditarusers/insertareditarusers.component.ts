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
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-insertareditarusers',
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
  templateUrl: './insertareditarusers.component.html',
  styleUrl: './insertareditarusers.component.css',
})
export class InsertareditarusersComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  users: Users = new Users();
  roles: Role[] = [];
  status: boolean = false;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private uS: UsersService,
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
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      role: [null, Validators.required],
    });
    this.rS.list().subscribe((roless: Role[]) => {
      this.roles = roless;
    });
  }
  aceptar() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.users.idUser = this.form.value.codigo;
      this.users.username = this.form.value.nombre;
      this.users.correoUser = this.form.value.correo;
      this.users.password = this.form.value.contrasena;
      this.users.rol.idRole = this.form.value.role.idRole;
      if (this.edicion) {
        //actualizar
        this.uS.update(this.users).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        //insertar
        this.uS.insert(this.users).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['rutausers']);
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUser),
          nombre: new FormControl(data.username),
          correo: new FormControl(data.correoUser),
          contrasena: new FormControl(data.password),
          role: new FormControl(data.rol.idRole),
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['rutausers']);  
  }
}

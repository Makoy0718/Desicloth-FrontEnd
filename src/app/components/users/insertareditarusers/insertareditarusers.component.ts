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
import { LoginService } from '../../../services/login.service';

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
  autoRol: Role = new Role();
  status: boolean = false;
  sesioniniciada: boolean = false;
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private uS: UsersService,
    private rS: RoleService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private lS: LoginService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar trae data
      this.init();
    });

    this.sesionIniciada();

    console.log(this.sesioniniciada);
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      role: [2, Validators.required],
    });
    
    
    if (!(this.sesioniniciada)) {
      this.autoRol.idRole = 2; 
    } else {
      this.rS.list().subscribe((roless: Role[]) => {
        this.roles = roless;
      });
    }
  }
  aceptar() {
    if (this.form.valid) {
      this.users.idUser = this.form.value.codigo;
      this.users.username = this.form.value.nombre;
      this.users.correoUser = this.form.value.correo;
      this.users.password = this.form.value.contrasena;
      if(this.sesioniniciada) {
        this.users.rol.idRole = this.form.value.role.idRole;
      }
      else { 
        this.users.rol = this.autoRol; // Asignar rol por defecto si no hay sesión iniciada
      }
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

      if (this.sesioniniciada) {
      this.router.navigate(['rutausers']);  
    } else {
      this.router.navigate(['login']);
    }
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

  sesionIniciada() {
    this.sesioniniciada = this.lS.verificar();
  }

  cancelar() {
    if (this.sesioniniciada) {
      this.router.navigate(['rutausers']);  
    } else {
      this.router.navigate(['rutalanding']);
    }
  }
}

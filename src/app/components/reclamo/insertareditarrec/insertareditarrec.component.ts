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
import { Reclamo } from '../../../models/reclamo';
import { ReclamoService } from '../../../services/reclamo.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-insertareditarrec',
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
  templateUrl: './insertareditarrec.component.html',
  styleUrl: './insertareditarrec.component.css',
})
export class InsertareditarrecComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  reclamo: Reclamo = new Reclamo();
  listaUsuarios: Users[] = [];
  status: boolean = false;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: ReclamoService,
    private uS: UsersService,
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
      title: ['', Validators.required],
      description: ['', Validators.required],
      state: ['', Validators.required],
      us: ['', Validators.required],
    });
    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }
  aceptar() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.reclamo.idReclamo = this.form.value.codigo;
      this.reclamo.titulo = this.form.value.title;
      this.reclamo.descripcion = this.form.value.description;
      this.reclamo.estado = this.form.value.state;
      this.reclamo.user.idUser = this.form.value.us;
      if (this.edicion) {
        //actualizar
        this.rS.update(this.reclamo).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        //insertar
        this.rS.insert(this.reclamo).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      console.log(this.form.value);
      //this.router.navigate(['rutareclamo']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idReclamo),
          title: new FormControl(data.titulo),
          description: new FormControl(data.descripcion),
          state: new FormControl(data.estado),
          us: new FormControl(data.user.idUser),
        });
      });
    }
  }
  cancelar() {
    this.router.navigate(['rutareclamo']);
  }
}

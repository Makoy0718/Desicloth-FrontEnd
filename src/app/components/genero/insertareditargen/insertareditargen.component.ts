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
import { Genero } from '../../../models/genero';
import { GeneroService } from '../../../services/genero.service';

@Component({
  selector: 'app-insertareditargen',
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
  templateUrl: './insertareditargen.component.html',
  styleUrl: './insertareditargen.component.css'
})
export class InsertareditargenComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  genero: Genero = new Genero();
  status: boolean = false;

  id: number = 0;
  edicion: boolean = false;


  constructor(
    private gS: GeneroService,
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
    if (this.form.valid) {
      this.genero.idGenero = this.form.value.codigo;
      this.genero.nombreGenero = this.form.value.nombre;
      this.genero.descripcionGenero = this.form.value.descripcion;
      if (this.edicion) {
        //actualizar
        this.gS.update(this.genero).subscribe(() => {
          this.gS.list().subscribe((data) => {
            this.gS.setList(data);
          });
        });
      } else {
        //insertar
        this.gS.insert(this.genero).subscribe(() => {
          this.gS.list().subscribe((data) => {
            this.gS.setList(data);
          });
        });
      }
      this.router.navigate(['rutagenero']);
    }
  }

  init() {
    if (this.edicion) {
      this.gS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idGenero),
          nombre: new FormControl(data.nombreGenero),
          descripcion: new FormControl(data.descripcionGenero),
        });
      });
    }
  }

}

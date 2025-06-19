import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-isertareditar-categoria',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './isertareditar-categoria.component.html',
  styleUrls: ['./isertareditar-categoria.component.css'],
})
export class IsertareditarCategoriaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  categoria: Categoria = new Categoria();
  descipcion: string = '';
  id: number = 0;
  edicion: boolean = false;
  nombreCategoria: string = '';

  constructor(
    private cS: CategoriaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      // actualizar trae data
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombreCategoria: ['', Validators.required],
      descripcionCategoria: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.categoria.idCategoria = this.form.value.codigo;
      this.categoria.nombreCategoria = this.form.value.nombreCategoria;
      this.categoria.descripcionCategoria = this.form.value.descripcionCategoria;
      if (this.edicion) {
        // actualizar
        this.cS.update(this.categoria).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        // insertar
        this.cS.insert(this.categoria).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['rutacategorias']);
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCategoria),
          nombreCategoria: new FormControl(data.nombreCategoria),
          descripcionCategoria: new FormControl(data.descripcionCategoria),
        });
      });
    }
  }
}

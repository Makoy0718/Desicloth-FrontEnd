import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GaleriaService } from '../../../services/galeria.service';
import { Galeria } from '../../../models/galeria';

@Component({
  selector: 'app-insertareditar-galeria',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditar-galeria.component.html',
  styleUrls: ['./insertareditar-galeria.component.css']
})
export class InsertareditarGaleriaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  id: number = 0;
  galeria: Galeria = new Galeria();

  nombre: string = "";
  visibility: boolean = false;
  rating: number = 0;
  edicion: boolean = false;

  constructor(
    private gS: GaleriaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      visibilidad: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      const galeriaData = {
        idGaleria: this.form.value.codigo,
        nombreGaleria: this.form.value.nombre,
        visibilidadGaleria: this.form.value.visibilidad,  // Asegurarse de que el valor sea un booleano o cadena
        ratingGaleria: this.form.value.rating
      };

      if (this.edicion) {
        // Actualizar
        this.gS.update(galeriaData).subscribe(
          () => {
            this.gS.list().subscribe((data) => {
              this.gS.setList(data);
            });
          },
          error => {
            console.error('Error al actualizar:', error);
          }
        );
      } else {
        // Insertar
        this.gS.insert(galeriaData).subscribe(
          () => {
            this.gS.list().subscribe((data) => {
              this.gS.setList(data);
            });
          },
          error => {
            console.error('Error al insertar:', error);
          }
        );
      }
      this.router.navigate(['rutaGaleria']);
    }
  }

  init() {
    if (this.edicion) {
      this.gS.listId(this.id).subscribe((data) => {
        this.form.setValue({
          codigo: data.idGaleria,
          nombre: data.nombreGaleria,
          visibilidad: data.visibilidadGaleria,
          rating: data.ratingGaleria
        });
      });
    }
  }
}

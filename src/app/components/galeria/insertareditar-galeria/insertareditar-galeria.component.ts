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
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';

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
  galeria: Galeria = new Galeria();

  id: number = 0;
  edicion: boolean = false;

  listaUser:Users[]=[]

  constructor(
    private gS: GaleriaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS:UsersService
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
      userS:['',Validators.required]
    });
    this.uS.list().subscribe(data=>{
      this.listaUser=data
    })
  }

  aceptar() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.galeria.idGaleria=this.form.value.codigo;
      this.galeria.nombreGaleria=this.form.value.nombre;
      this.galeria.visibilidadGaleria=this.form.value.visibilidad;
      this.galeria.ratingGaleria=this.form.value.rating;
      this.galeria.users.idUser=this.form.value.userS

      if (this.edicion) {
        // Actualizar
        this.gS.update(this.galeria).subscribe(() => {
            this.gS.list().subscribe((data) => {
              this.gS.setList(data);
            });
          });
      } else {
        // Insertar
        this.gS.insert(this.galeria).subscribe(() => {
            this.gS.list().subscribe((data) => {
              this.gS.setList(data);
            });
          });
      }
      this.router.navigate(['rutaGaleria']);
    }
  }

  init() {
    if (this.edicion) {
      this.gS.listId(this.id).subscribe((data) => {
        this.form=new FormGroup({
          codigo:new FormControl(data.idGaleria),
          nombre:new FormControl(data.nombreGaleria),
          visibilidad:new FormControl(data.visibilidadGaleria),
          rating:new FormControl(data.ratingGaleria),
          userS:new FormControl(data.users.idUser),  
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['rutagaleria']);  
  }
}

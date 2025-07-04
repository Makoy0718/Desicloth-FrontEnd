import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-buscarcategoria',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './buscarcategoria.component.html',
  styleUrl: './buscarcategoria.component.css'
})
export class BuscarcategoriaComponent implements OnInit {
   dataSource: MatTableDataSource<Categoria> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];

  form: FormGroup;
  busquedaNombre: string=""

  constructor(
  private cS: CategoriaService, 
  private fb: FormBuilder) {
    this.form = fb.group({
      nombre: [''],
    });
  }

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  this.form.get('nombre')?.valueChanges.subscribe(value=>{
    this.busquedaNombre=value
    this.buscar()
  })

  }

  buscar() {
    if (this.busquedaNombre && this.busquedaNombre.trim().length > 0) {
      this.cS.searchByName(this.busquedaNombre.trim()).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      this.cS.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }

}
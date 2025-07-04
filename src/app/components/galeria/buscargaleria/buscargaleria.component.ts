import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Galeria } from '../../../models/galeria';
import { GaleriaService } from '../../../services/galeria.service';

@Component({
  selector: 'app-buscargaleria',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './buscargaleria.component.html',
  styleUrl: './buscargaleria.component.css'
})
export class BuscargaleriaComponent implements OnInit{
  dataSource: MatTableDataSource<Galeria> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  form: FormGroup;
  busquedaNombre: string=""

  constructor(
  private gS: GaleriaService, 
  private fb: FormBuilder) {
    this.form = fb.group({
      nombre: [''],
    });
  }

  ngOnInit(): void {
    this.gS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  this.form.get('nombre')?.valueChanges.subscribe(value=>{
    this.busquedaNombre=value
    this.buscar()
  })

  }

  buscar() {
    if (this.busquedaNombre && this.busquedaNombre.trim().length > 0) {
      this.gS.searchByName(this.busquedaNombre.trim()).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      this.gS.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }


}

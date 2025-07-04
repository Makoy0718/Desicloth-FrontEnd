import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Genero } from '../../../models/genero';
import { GeneroService } from '../../../services/genero.service';

@Component({
  selector: 'app-buscargenero',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './buscargenero.component.html',
  styleUrl: './buscargenero.component.css'
})
export class BuscargeneroComponent {
dataSource: MatTableDataSource<Genero> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];

  form: FormGroup;
  idgen: number = 0;

  constructor(private gS: GeneroService, private fb: FormBuilder) {
    this.form = fb.group({
      id: [''],
    });
  }

  ngOnInit(): void {
    this.gS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.form.get('id')?.valueChanges.subscribe((value) => {
      this.idgen = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.idgen > 0) {
      this.gS.listId(this.idgen).subscribe((data) => this.dataSource = new MatTableDataSource([data]));
    } else {
      this.gS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}
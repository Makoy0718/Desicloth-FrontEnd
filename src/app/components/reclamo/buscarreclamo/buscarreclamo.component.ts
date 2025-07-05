import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reclamo } from '../../../models/reclamo';
import { ReclamoService } from '../../../services/reclamo.service';

@Component({
  selector: 'app-buscarreclamo',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,],
  templateUrl: './buscarreclamo.component.html',
  styleUrl: './buscarreclamo.component.css'
})
export class BuscarreclamoComponent {
dataSource: MatTableDataSource<Reclamo> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  form: FormGroup;
  idgen: number = 0;

  constructor(private rS: ReclamoService, private fb: FormBuilder) {
    this.form = fb.group({
      id: [''],
    });
  }

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.form.get('id')?.valueChanges.subscribe((value) => {
      this.idgen = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.idgen > 0) {
      this.rS.listId(this.idgen).subscribe((data) => this.dataSource = new MatTableDataSource([data]));
    } else {
      this.rS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}

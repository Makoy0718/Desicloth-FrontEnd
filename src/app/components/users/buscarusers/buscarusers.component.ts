import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-buscarusers',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './buscarusers.component.html',
  styleUrl: './buscarusers.component.css',
})
export class BuscarusersComponent implements OnInit {
  dataSource: MatTableDataSource<Users> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  form: FormGroup;
  busquedaNombre: string = '';

  constructor(private uS: UsersService, private fb: FormBuilder) {
    this.form = fb.group({
      nombre: [''],
    });
  }

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.form.get('nombre')?.valueChanges.subscribe((value) => {
      this.busquedaNombre = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.busquedaNombre && this.busquedaNombre.trim().length > 0) {
      this.uS.searchUserByName(this.busquedaNombre.trim()).subscribe((data) => {
        this.dataSource = new MatTableDataSource([data]);
      });
    } else {
      this.uS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}

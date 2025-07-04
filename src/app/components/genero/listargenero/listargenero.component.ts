import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Genero } from '../../../models/genero';
import { GeneroService } from '../../../services/genero.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listargenero',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
  ],
  templateUrl: './listargenero.component.html',
  styleUrl: './listargenero.component.css',
})
export class ListargeneroComponent implements OnInit {
  dataSource: MatTableDataSource<Genero> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gS: GeneroService) {}

  ngOnInit(): void {
    this.gS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.gS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.gS.deleteGe(id).subscribe((data) => {
      this.gS.list().subscribe((data) => {
        this.gS.setList(data);
      });
    });
  }
}

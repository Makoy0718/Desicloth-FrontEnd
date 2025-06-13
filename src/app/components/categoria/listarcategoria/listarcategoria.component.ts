import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarcategoria',
  imports: [MatTableModule, CommonModule],
  templateUrl: './listarcategoria.component.html',
  styleUrl: './listarcategoria.component.css',
})
export class ListarcategoriaComponent implements OnInit {
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];

  constructor(private cS: CategoriaService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}

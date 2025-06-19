import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-listarcategoria',
  imports: [
    MatTableModule, 
    CommonModule,
    RouterLink, 
    MatButtonModule,
    MatIconModule
    
  ],
  templateUrl: './listarcategoria.component.html',
  styleUrl: './listarcategoria.component.css',
})
export class ListarcategoriaComponent implements OnInit {
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];

  constructor(private cS: CategoriaService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

   eliminar(id: number) {
    this.cS.deleteA(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}

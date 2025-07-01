import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Galeria } from '../../../models/galeria';
import { GaleriaService } from '../../../services/galeria.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-listargaleria',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './listargaleria.component.html',
  styleUrl: './listargaleria.component.css'
})
export class ListargaleriaComponent implements OnInit {
  dataSource: MatTableDataSource<Galeria> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private gS: GaleriaService) {}

  ngOnInit(): void {
    this.gS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.gS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; 

    });
  }

  eliminar(id: number) {
    this.gS.deleteA(id).subscribe((data) => {
      this.gS.list().subscribe((data) => {
        this.gS.setList(data);
      });
    });
  }

}

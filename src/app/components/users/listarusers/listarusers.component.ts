import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarusers',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
  ],
  templateUrl: './listarusers.component.html',
  styleUrl: './listarusers.component.css',
})
export class ListarusersComponent implements OnInit {
  dataSource: MatTableDataSource<Users> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UsersService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.uS.deleteU(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}

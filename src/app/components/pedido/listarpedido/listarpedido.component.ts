import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-listarpedido',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule,
  ],
  templateUrl: './listarpedido.component.html',
  styleUrl: './listarpedido.component.css'
})
export class ListarpedidoComponent implements OnInit {

  dataSource: MatTableDataSource<Pedido> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6'];
  

  @ViewChild(MatPaginator) paginator!:MatPaginator;//declarando paginator
  
  constructor(private pS: PedidoService) {}

  ngOnInit(): void {
      this.pS.listPedido().subscribe((data) => {
        this.dataSource= new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator; //es de painator
      });
      this.pS.getListPedido().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator;
      });
    }

    ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;//conectando
  }

  eliminarPedido(id:number) {
    this.pS.deletePedido(id).subscribe((data) => {
      this.pS.listPedido().subscribe((data) => {
        this.pS.setListPedido(data);
        //this.dataSource.data=data; actualizas datos en el paginator
      });
    });
  }


}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pago } from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

import { FormBuilder } from '@angular/forms';
import { DetallePedido } from '../../../models/detallepedido';
import { DetallepedidoService } from '../../../services/detallepedido.service';
import {inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-listarpago',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './listarpago.component.html',
  styleUrl: './listarpago.component.css'
})
export class ListarpagoComponent implements OnInit {

  dataSource:MatTableDataSource<Pago>=new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7',];

  

   @ViewChild(MatPaginator) paginator!:MatPaginator;

   constructor(
    private pagoS:PagoService
  ){}

   ngOnInit():void{
    this.pagoS.listPago().subscribe((data) =>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//es de paginator
    });
    this.pagoS.getListPago().subscribe((data) =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    });

  
  }
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;//conectando
  }

  eliminarPago(id:number){
    this.pagoS.deletePago(id).subscribe((data)=>{
      this.pagoS.listPago().subscribe((data)=>{
        this.pagoS.setListPago(data);
        // this.dataSource.data=data;
      });
    });
  }
}

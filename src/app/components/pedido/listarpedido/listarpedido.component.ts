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
import { DetallePedido } from '../../../models/detallepedido';
import { DetallepedidoService } from '../../../services/detallepedido.service';
import {inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';

import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogDetallePedidoComponent } from '../../dialog-detalle-pedido/dialog-detalle-pedido.component';

@Component({
  selector: 'app-listarpedido',
  standalone:true, //el component MatSnackBarModule tiene un imports standlone
  providers: [provideNativeDateAdapter()],
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule
  ],
  templateUrl: './listarpedido.component.html',
  styleUrl: './listarpedido.component.css'
})
export class ListarpedidoComponent implements OnInit {

  dataSource: MatTableDataSource<Pedido> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7'];

  detallePedidos: DetallePedido[]=[]; //para traer data de producto
  

  @ViewChild(MatPaginator) paginator!:MatPaginator;//declarando paginator

  constructor(
    private pS: PedidoService,
    private detallePS: DetallepedidoService,
    private snackBar:MatSnackBar, //se inyecta aca
    private dialog:MatDialog
  ) {}

  verDetalle(pedido:Pedido):void{
    const detallesAsociados=this.detallePedidos.filter(dp=>dp.pedido.idPedido === pedido.idPedido);
    const pedidoConDetalles = {...pedido,detalles:detallesAsociados};
    this.dialog.open(DialogDetallePedidoComponent,{
      width:'400px',
      data:pedidoConDetalles
    });
  }

  ngOnInit(): void {
      this.pS.listPedido().subscribe((data) => {
        this.dataSource= new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator; //es de painator
      });
      this.pS.getListPedido().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator;
      });

      //Recibe(escucha) los cambios automaticos de la lista
      this.detallePS.getListDetallePedido().subscribe((data)=>{
        this.detallePedidos=data;
        console.log("DETALLES PEDIDOS:",this.detallePedidos);
      });
      //carga inicial
      this.detallePS.listDetallePedido().subscribe((data)=>{
        this.detallePedidos=data;
      })

    }
    ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;//conectando
  }

  //confirma antes de eliminar un pedido
  confirmarEliminacion(id:number){
    console.log("Se ejecuto confirmacionEliminacion para el pedido",id)
    const confirmar= window.confirm("¿Estás seguro de que quieres eliminar este pedido y todos sus productos?");
    if(confirmar){
      this.eliminarPedido(id);
    }
  }

  //eliminar manualmente los detallespedido antes de eliminar el Pedido
  eliminarPedido(id:number){
    //Paso1:Filtrar los detalles relacionados a este pedido
    const detallesAsociados=this.detallePedidos.filter(dp=>dp.pedido.idPedido ===id);
    //Paso2: Si hay detalles, eliminarlos uno por uno
    if(detallesAsociados.length>0){
      let eliminados=0;
      detallesAsociados.forEach((detalle,index)=>{
        this.detallePS.deleteDetallePedido(detalle.idDetallePedido).subscribe(()=>{
          eliminados++;
          //Cuando todos los detalles esten eliminados, eliminar el pedido
          if(eliminados=== detallesAsociados.length){
            this.eliminarPedidoFinal(id);
          }
        });
      });
    }else{
      //si no hay detalles, eliminar directamente
      this.eliminarPedidoFinal(id);
    }
  }
  eliminarPedidoFinal(id:number) {
    this.pS.deletePedido(id).subscribe((data) => {
      this.pS.listPedido().subscribe((data) => {
        this.pS.setListPedido(data);
        //mensaje de snackbar reutilizable
        this.mostrarMensaje('Pedido eliminado con éxito');
      });
      //refrescar productos despues de eliminar un pedido,tambien recarga detalles para reflejar el cambio
      this.detallePS.listDetallePedido().subscribe((data)=>{
        this.detallePedidos=data;
      });
    });
  }
  //snackbar reutilizable
  mostrarMensaje(mensaje:string,accion:string="Cerrar"){
    this.snackBar.open(mensaje,accion,{
      duration:4000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    });
  }
  //Metodo para mostrar los productos asociados a un pedido
  obtenerProductosPorPedido(idPedido: number): string {
  const productos = this.detallePedidos
    .filter(detalle => detalle.pedido.idPedido === idPedido)
    .map(detalle => `${detalle.producto.nombreProducto} (${detalle.producto.tallaProducto})`);

  return productos.length > 0 ? productos.join(', ') : 'Sin productos';
}
  

}
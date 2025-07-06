import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Pedido } from '../../models/pedido';

@Component({
  selector: 'app-dialog-detalle-pedido',
  standalone:true,
  imports: [
    CommonModule,  MatDialogModule
  ],
  templateUrl: './dialog-detalle-pedido.component.html',
  styleUrl: './dialog-detalle-pedido.component.css'
})
export class DialogDetallePedidoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogDetallePedidoComponent>
  ){}
  cerrar():void{
    this.dialogRef.close();
  }

}

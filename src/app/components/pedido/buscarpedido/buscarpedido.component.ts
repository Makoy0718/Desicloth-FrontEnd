import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from '../../../models/pedido';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-buscarpedido',
  imports: [
    MatTableModule,
    CommonModule,
    MatFormFieldModule,
  ],
  templateUrl: './buscarpedido.component.html',
  styleUrl: './buscarpedido.component.css'
})
export class BuscarpedidoComponent implements OnInit{
  dataSource: MatTableDataSource<Pedido>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6'];
  form:FormGroup;
  busquedaNombreUsuario:string=""

  constructor(
    private pS:PedidoService,
    private fb:FormBuilder) {
      this.form=fb.group({
        nombre:[''],
      });
    }

    ngOnInit(): void {
        this.pS.listPedido().subscribe((data)=>{
        this.dataSource=new MatTableDataSource(data);
        });
        this.form.get('nombre')?.valueChanges.subscribe(value=>{
          this.busquedaNombreUsuario=value
          //this.buscarPorNombreUsuario()
        })
    }
    //buscarPorNombreUsuario(){
      //if(this.busquedaNombreUsuario && this.busquedaNombreUsuario.trim().length>0){
        //this.pS.
      //};
    //}

  

}

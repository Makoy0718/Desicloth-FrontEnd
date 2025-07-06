import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PagoService } from '../../../services/pago.service';
import { Pago } from '../../../models/pago';
@Component({
  selector: 'app-busquedapago',
  imports: [
     MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './busquedapago.component.html',
  styleUrl: './busquedapago.component.css'
})
export class BusquedapagoComponent implements OnInit{
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6'];
  form: FormGroup;
  busquedaMetodo:string=""
  constructor(
    private pagoS:PagoService,
    private fb:FormBuilder)
    {
      this.form = fb.group({
      nombre: [''],
    });
  }

  ngOnInit(): void {
      this.pagoS.listPago().subscribe((data)=>{
        this.dataSource = new MatTableDataSource(data);
      });
      this.form.get('nombre')?.valueChanges.subscribe(value=>{
        this.busquedaMetodo=value
        this.buscar()
      })
  }
  buscar(){
    if(this.busquedaMetodo && this.busquedaMetodo.trim().length>0){
      this.pagoS.buscarPorMetodo(this.busquedaMetodo.trim()).subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      });
    }else{
      this.pagoS.listPago().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      });
    }
  }


}

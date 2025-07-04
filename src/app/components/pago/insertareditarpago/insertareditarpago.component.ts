import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Pago } from '../../../models/pago';
import { Pedido } from '../../../models/pedido';
import { PagoService } from '../../../services/pago.service';
import { PedidoService } from '../../../services/pedido.service';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { monitorEventLoopDelay } from 'perf_hooks';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-insertareditarpago',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    

  ],
  templateUrl: './insertareditarpago.component.html',
  styleUrl: './insertareditarpago.component.css'
})
export class InsertareditarpagoComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  pago: Pago= new Pago();
  id:number=0;
  edicion: boolean=false;
  listaPedido: Pedido[]=[] //arreglo de tipo pedido

  tiposPago: {value:String,viewValue:string} []= [
    {value:'Tarjeta Debito',viewValue:'Tarjeta Credito'},
    {value:'Yape',viewValue:'Yape'},
    {value:'paypal',viewValue:'paypal'},
    {value:'Plin',viewValue:'Plin'},
  ];

  constructor(
    private pagoS: PagoService,
    private pS: PedidoService,
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
      this.route.params.subscribe((data: Params)=>{
        this.id=data['id'];
        this.edicion=data['id']!=null;
        this.init();
      });
      this.form=this.formBuilder.group({
        codigo:[''],
        metodo:['',Validators.required],
        monto:['',Validators.required],
        comprobante:['',Validators.required],
        fechaP:['',Validators.required],
        pedid:['',Validators.required],
      });
      this.pS.listPedido().subscribe((pedidoss:Pedido[])=>{
        this.listaPedido=pedidoss;
      });
  }
  aceptar(){
    console.log("metodo aceptar ejecutado")
    console.log(this.form.value);
    if(this.form.valid){
      this.pago.idPago=this.form.value.codigo;
      this.pago.metodoPago=this.form.value.metodo;
      this.pago.montoPago=this.form.value.monto;
      this.pago.comprobantePago=this.form.value.comprobante;
      this.pago.fechaPago=this.form.value.fechaP;
      this.pago.pedido.idPedido=this.form.value.pedid;
    }
    if(this.edicion){
      this.pagoS.updatePago(this.pago).subscribe(()=>{
        this.pagoS.listPago().subscribe((data)=>{
          this.pagoS.setListPago(data);
        });
      });
    }else {
      this.pagoS.insertPago(this.pago).subscribe(()=>{
        this.pagoS.listPago().subscribe((data)=>{
          this.pagoS.setListPago(data);
        });
      });
    }this.router.navigate(['rutapagos']);
  }
  init(){
    if(this.edicion){
      this.pagoS.listIdPago(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idPago),
          metodo:new FormControl(data.metodoPago),
          monto:new FormControl(data.montoPago),
          comprobante:new FormControl(data.comprobantePago),
          fechaP:new FormControl(data.fechaPago),
          pedid: new FormControl(data.pedido.idPedido),
        });
      });
    }
  }
  cancelar(){
    this.router.navigate(['rutapagos'])
  }
}

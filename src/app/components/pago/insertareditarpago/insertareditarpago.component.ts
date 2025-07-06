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
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { LoginService } from '../../../services/login.service';

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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './insertareditarpago.component.html',
  styleUrl: './insertareditarpago.component.css'
})
export class InsertareditarpagoComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  pago: Pago= new Pago();
  pedidosDisponibles:Pedido[]=[];
  id:number=0;
  edicion: boolean=false;
  user:Users=new Users();

  //ya no se hace: pago.pedido.users.username

  tiposPago: {value:String,viewValue:string} []= [
    {value:'Tarjeta Debito',viewValue:'Tarjeta Debito'},
    {value:'Tarjeta Credito',viewValue:'Tarjeta Credito'},
    {value:'Yape',viewValue:'Yape'},
    {value:'paypal',viewValue:'paypal'},
    {value:'Plin',viewValue:'Plin'},
    {value:'Pago Efectivo',viewValue:'Pago Efectivo'},
    {value:'Bitcoin',viewValue:'Bitcoin'},
    {value:'Apple pay',viewValue:'Apple pay'},
    {value:'Google Pay',viewValue:'Google Pay'},
  ];

  constructor(
    private pagoS: PagoService,
    private pS: PedidoService,
    private uS: UsersService,
    private loginService:LoginService,
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
        codigo:[''], //id generado para un pago
        metodo:['',Validators.required],
        monto:['0',Validators.required],
        comprobante:['',Validators.required],
        fechaP:[new Date(),Validators.required],
        pedido:[null,Validators.required],
      });

      this.obtenerIdUsuario(); //para filtrar pedidos del usuario actual
     
  }
  obtenerIdUsuario(){
    const username=this.loginService.showUsername();
    console.log(username)
    this.uS.searchUserByName(username).subscribe({
      next:(user)=>{
        this.user=user;

        // Una vez que tenemos al usuario, ya es seguro hacer esto
        this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = this.id != null;
        this.init();});

        if(!this.edicion){
          this.cargarPedidosDisponibles();
        }
        },
    });
  }
  cargarPedidosDisponibles(){
    this.pagoS.listPago().subscribe((pagos)=>{
      this.pS.listPedido().subscribe((pedidos)=>{
        const pedidosConPago=pagos.map(p=>p.pedido.idPedido);
        this.pedidosDisponibles=pedidos.filter(
          p=>p.users.idUser===this.user.idUser && !pedidosConPago.includes(p.idPedido)
        );
      });
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
      this.pago.pedido=this.form.value.pedido; //asigna el pedido seleccionado al objeto pago
    }
    if(this.edicion){
      //actualizar
      this.pago.idPago=this.id;
      this.pagoS.updatePago(this.pago).subscribe(()=>{
        this.pagoS.listPago().subscribe((data)=>{
          this.pagoS.setListPago(data);
        });
      });
    }else {
      this.pagoS.insertPago(this.pago).subscribe( ()=>{
        //console.log("pago insertado:",pagoRegistrado)
        this.pagoS.listPago().subscribe(data=>{
          this.pagoS.setListPago(data);
        });
      });
    }this.router.navigate(['rutapagos']);
  }
  init(){
    if(this.edicion){
      this.pagoS.listIdPago(this.id).subscribe((data)=>{
        this.pago=data; 

         //reccargar lista de pedidos incluyendo el actual,recarga pediddos incluyecdo el actual (en edicion)
        this.pagoS.listPago().subscribe((pagos)=>{
          this.pS.listPedido().subscribe((pedidos)=>{
            const pedidosConPago=pagos.map(p=>p.pedido.idPedido);

            this.pedidosDisponibles=pedidos.filter(
              p=>p.users.idUser===this.user.idUser &&
              (!pedidosConPago.includes(p.idPedido) || p.idPedido === data.pedido.idPedido)
            );

        this.form.patchValue({
        codigo: data.idPago,
        metodo: data.metodoPago,
        monto: data.montoPago,
        comprobante: data.comprobantePago,
        fechaP: data.fechaPago,
        pedido: data.pedido,
      });
          });
        });
      });
    }
  }

  cancelar(){
    this.router.navigate(['rutapagos'])
  }
}

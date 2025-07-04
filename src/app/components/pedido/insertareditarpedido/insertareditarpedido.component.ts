import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Pedido } from '../../../models/pedido';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
import { ActivatedRoute, Params } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {MatRadioModule} from '@angular/material/radio';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-insertareditarpedido',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './insertareditarpedido.component.html',
  styleUrl: './insertareditarpedido.component.css'
})

export class InsertareditarpedidoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pedido: Pedido = new Pedido();
  //status: boolean =false;
  id:number=0;
  edicion:boolean=false;
  listaUsuarios: Users[]=[] //arreglo de tipo usuarios

  constructor(
    private pS:PedidoService,
    private uS:UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    
  ){}
  ngOnInit(): void {
      this.route.params.subscribe((data: Params)=>{
        this.id=data['id'];
        this.edicion=data['id'] !=null;
        //actualiza trae data
        this.init();
      });
      this.form=this.formBuilder.group({
        codigo:[''],
        fecha:['',[Validators.required, this.fechaPasaValidator()]],
        estado:['',Validators.required],
        usu: ['', Validators.required], //control correcto
      });
      this.uS.list().subscribe((usuarioss: Users[]) =>{
        this.listaUsuarios=usuarioss;
      });
  }
  aceptar(){
    console.log("metodo aceptar ejecutado")
    if(this.form.valid)
      {
      this.pedido.idPedido =this.form.value.codigo;
      this.pedido.fechaPedido=this.form.value.fecha;
      this.pedido.estadoPedido=this.form.value.estado;
      this.pedido.users.idUser=this.form.value.usu;
      if(this.edicion) 
        {
        //actualizar
        this.pS.updatePedido(this.pedido).subscribe(()=>{
          this.pS.listPedido().subscribe((data)=>{
            this.pS.setListPedido(data);
          });
        });
      } else {
        //insertar
        this.pS.insertPedido(this.pedido).subscribe(()=>{
          this.pS.listPedido().subscribe((data)=>{
            this.pS.setListPedido(data);
          });
        });
      }this.router.navigate(['rutapedidos']);
    }
  }
  init(){
    if(this.edicion){
      this.pS.listIdPedido(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idPedido),
          fecha:new FormControl(data.fechaPedido),
          estado:new FormControl(data.estadoPedido),
          usu:new FormControl(data.users.idUser), //control
        });
      });
    }
  }
  //validacion personalizada para verificar que la fecha es pasada
  fechaPasaValidator():ValidatorFn{
    return (control: AbstractControl):{ [key:string]: any } | null =>{
      const fechaSeleccionada =new Date(control.value);
      const hoy =new Date();
      hoy.setHours(0,0,0,0); //ignorar la hora
      if(fechaSeleccionada>=hoy){
        return {fechaInvalida:true} //fecha no valida
      } 
      return null;
    };
  }

  cancelar(){
    this.router.navigate(['rutapedidos'])
  }
}
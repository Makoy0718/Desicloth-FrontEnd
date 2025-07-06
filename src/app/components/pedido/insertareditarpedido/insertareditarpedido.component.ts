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
import { DetallePedido } from '../../../models/detallepedido';
import { DetallepedidoService } from '../../../services/detallepedido.service';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto';
import { LoginService } from '../../../services/login.service';

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
  detallePedido: DetallePedido = new DetallePedido(); //objeto de la tabla intermediaria
  
  //status: boolean =false;
  id:number=0;
  edicion:boolean=false;
  listaUsuarios: Users[]=[]; //arreglo de tipo usuarios ****+
  productos:Producto[]=[];
  idUser: number=0; //***** verificar 
  user:Users=new Users(); //para obtener el id del usuario logeado

  constructor(
    private pS:PedidoService, //disenoService
    private uS:UsersService, //usersService
    private formBuilder: FormBuilder, //fb
    private router: Router,
    private route: ActivatedRoute,
    //llamando a detallePedido y producto
    private detallepedidoService: DetallepedidoService, //tabla intermediaria
    private productoService: ProductoService, //ver como esta codificcado producto ***ver como esta desarrollado producto
    private loginService: LoginService //llamando a login service para obtener el id de usuario logeado
  ){}
  ngOnInit(): void {
      this.route.params.subscribe((data: Params)=>{
        this.id=data['id'];
        this.edicion=data['id'] !=null;
        //actualiza trae data
        this.init();
      });
      this.form=this.formBuilder.group({
        codigo:[''], //idDiseno
        producto:[null,Validators.required],//datos que traen de producto
        fecha:[new Date(),Validators.required],
        estado:['',Validators.required],
        //usu: ['', Validators.required], //control correcto-usuario-esto se TIENE QUE ELIMINAR AL FINAL***
      });
      //this.uS.list().subscribe((usuarioss: Users[]) =>{
        //this.listaUsuarios=usuarioss;
      //});
      //Funciones que se encargan de cargar la lista de producto para mostrar en el formulario
      this.productoService.list().subscribe(data=>this.productos=data);

      this.obtenerIdUsuario(); //para obtener el id de usuario registrado
  }

  aceptar(){
    console.log("metodo aceptar ejecutado")
    if(this.form.valid)
      {
        //asignar los valores del formulario al objeto pedido
      this.pedido.idPedido =this.form.value.codigo;
      this.pedido.fechaPedido=this.form.value.fecha;
      this.pedido.estadoPedido=this.form.value.estado;

      //this.pedido.users.idUser=this.form.value.usu; // 
      this.pedido.users=this.user;// PONER ESTO AL FINAL
      
      //asignar el producto seleccionado al detallePedido
      this.detallePedido.producto= this.form.value.producto
      //asociar el pedido al detalle
      this.detallePedido.pedido=this.pedido
      
      if(this.edicion) 
        {
        //actualizar
        this.pedido.idPedido=this.id;
        this.pS.updatePedido(this.pedido).subscribe(()=>{
          this.pS.listPedido().subscribe((data)=>{
            this.pS.setListPedido(data);
          });
        });
      } else {
        //insertar
        this.pS.insertPedido(this.pedido).subscribe((pedidoRegistrado)=>{
          console.log("Pedido insertado:",pedidoRegistrado) //ver consola
          //Asignar el pedido devuelto (con ID) al detalle
          this.detallePedido.pedido=pedidoRegistrado;
          //console.log para ver que estas enviando al backend
          console.log("Detalle a registrar:",this.detallePedido)
          this.detallepedidoService.insert(this.detallePedido).subscribe(()=>{
            this.detallepedidoService.listDetallePedido().subscribe((data)=>{
              this.detallepedidoService.setListDetallePedido(data); //actualiza la lista reactiva
            })
          })
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
          usu:new FormControl(data.users.idUser), //control -ELIMINAR AL FINAL
        });
      });
    }
  }

  obtenerIdUsuario(){ //para obtener le usuario actual
    const username = this.loginService.showUsername();
    console.log(username)
    this.uS.searchUserByName(username).subscribe({
      next:(user)=>{
        this.user=user;
      }
    });
  }
  cancelar(){
    this.router.navigate(['rutapedidos'])
  }
}
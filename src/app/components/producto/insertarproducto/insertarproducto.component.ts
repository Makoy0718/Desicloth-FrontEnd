import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,

} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-insertarproducto',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,

  ],
  templateUrl: './insertarproducto.component.html',
  styleUrl: './insertarproducto.component.css'
})
export class InsertarproductoComponent implements OnInit{
  form:FormGroup = new FormGroup({});
  producto: Producto = new Producto();
  status: boolean = false;

  id: number = 0;
  edicion: boolean = false;

  tiposTalla:{ value:String, viewValue:string}[]=[
    {value:'XXS',viewValue:'XXS'},
    {value:'XS',viewValue:'XS'},
    {value:'S',viewValue:'S'},
    {value:'M',viewValue:'M'},
    {value:'L',viewValue:'L'},
    {value:'XL',viewValue:'XL'},
    {value:'XXL',viewValue:'XXL'},
  ]

  constructor(
    private prodS:ProductoService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params) =>{
      this.id=data['id'];
      this.edicion = data['id']!=null;
      //this.init();
    });

    this.form= this.formBuilder.group({
      codigo:[''],
      nombre:['',Validators.required],
      descripcion:['',,Validators.required],
      tipo:['',Validators.required],
      talla:['',Validators.required],
      precio:['',Validators.required],
    });   
  }
  aceptar(){
    if(this.form.valid){
      this.producto.idProducto=this.form.value.codigo;
      this.producto.nombreProducto=this.form.value.nombre;
      this.producto.descripcionProducto=this.form.value.descripcion;
      this.producto.tipoProducto=this.form.value.tipo;
      this.producto.tallaProducto=this.form.value.talla;
      this.producto.precioProducto=this.form.value.precio;
      if(this.edicion){
        this.prodS.
      }
    }
  }




}

import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarproducto',
  imports: [MatTableModule, CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './listarproducto.component.html',
  styleUrl: './listarproducto.component.css'
})
export class ListarproductoComponent implements OnInit{
  productos: Producto[] = [];

  constructor(private pS:ProductoService){}

  ngOnInit(): void {
    this.pS.list().subscribe(data=>{
      this.productos = data;
    })
  }
}

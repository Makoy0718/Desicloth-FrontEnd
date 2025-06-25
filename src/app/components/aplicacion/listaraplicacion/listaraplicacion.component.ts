import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';




@Component({
  selector: 'app-listaraplicacion',
  imports: [ CommonModule, MatTableModule],
  templateUrl: './listaraplicacion.component.html',
  styleUrl: './listaraplicacion.component.css'
})
export class ListaraplicacionComponent{
}

import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Genero } from '../../../models/genero';
import { GeneroService } from '../../../services/genero.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listargenero',
  imports: [MatTableModule, CommonModule],
  templateUrl: './listargenero.component.html',
  styleUrl: './listargenero.component.css'
})
export class ListargeneroComponent implements OnInit{
  dataSource:MatTableDataSource<Genero>=new MatTableDataSource()
  displayedColumns:string[]=["c1","c2","c3"]

  constructor(private gS:GeneroService){}

  ngOnInit(): void {
    this.gS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}

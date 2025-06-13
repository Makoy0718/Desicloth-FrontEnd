import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Role } from '../../../models/role';



@Component({
  selector: 'app-listaraplicacion',
  imports: [ CommonModule, MatTableModule],
  templateUrl: './listaraplicacion.component.html',
  styleUrl: './listaraplicacion.component.css'
})
export class ListaraplicacionComponent implements OnInit{
  dataSource:MatTableDataSource<Role> =new MatTableDataSource()
  displayedColumns: string[] = ["c1","c2","c3"]

  constructor(private rS:RoleService){}

  ngOnInit(): void {
      this.rS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
        
      })
  }
}

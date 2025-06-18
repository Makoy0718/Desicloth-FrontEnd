import { Routes } from '@angular/router';
import { AplicacionComponent } from './components/aplicacion/aplicacion.component';
import { InsertareditarComponent } from './components/aplicacion/insertareditar/insertareditar.component';
import { ListarproductoComponent } from './components/producto/listarproducto/listarproducto.component';


//RUTAS DEL FRONTEND
export const routes: Routes = [
    
    {
        path: 'Productos',component: ListarproductoComponent,
        children:[
            { path: '',component: ListarproductoComponent}
            //{path: 'insertar', component: ProductoInsertarComponent }, //productos/insertar
        ]
    },
    {
        path: 'rutarole',component:AplicacionComponent,
    children:[
        { path:'conexion',component:InsertareditarComponent}
    ]
    },

     // Ruta comodín (opcional)
  { path: '**', redirectTo: 'productos' }


];

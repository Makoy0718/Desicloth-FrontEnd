import { Routes } from '@angular/router';
import { AplicacionComponent } from './components/aplicacion/aplicacion.component';
import { InsertareditarComponent } from './components/aplicacion/insertareditar/insertareditar.component';

export const routes: Routes = [{
    path: 'rutarole',component:AplicacionComponent,
    children:[
        {
            path:'conexion',component:InsertareditarComponent
        }
    ]
}];

import { Routes } from '@angular/router';
import { AplicacionComponent } from './components/aplicacion/aplicacion.component';
import { InsertareditarComponent } from './components/aplicacion/insertareditar/insertareditar.component';
import { ListarproductoComponent } from './components/producto/listarproducto/listarproducto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { IsertareditarCategoriaComponent } from './components/categoria/isertareditar-categoria/isertareditar-categoria.component';
import { DisenoComponent } from './components/diseno/diseno.component';
import { ListardisenoComponent } from './components/diseno/listardiseno/listardiseno.component';
import { CreardisenoComponent } from './components/diseno/creardiseno/creardiseno.component';


//RUTAS DEL FRONTEND
export const routes: Routes = [
    
    {
        path: 'rutaProductos',
        component: ListarproductoComponent,
        children:[
            { 
                path: '',
                component: ListarproductoComponent
            }
            //{path: 'insertar', component: ProductoInsertarComponent }, //productos/insertar
        ]
    },
    {
        path: 'rutarole',
        component:AplicacionComponent,
        children:[
        { 
            path:'conexionRole',
            component:InsertareditarComponent
        }
    ]
    },
    {   
        path:'rutacategorias',
        component:CategoriaComponent,
        children: [
            {
                path: 'insertarCategoria',
                component: IsertareditarCategoriaComponent,
            },
            {
                path: 'edicionesCategoria/:id',
                component: IsertareditarCategoriaComponent,
            },
        ],
        
    },
	{
        path: 'rutadisenos',
        component: DisenoComponent,
        children:[
            { 
                path: 'listarDiseno',
                component: ListardisenoComponent
            },{ 
                path: 'crearDiseno',
                component: CreardisenoComponent
            }
        ]
    },
     // Ruta comodín (opcional)
    { path: '**', redirectTo: 'productos' }
];

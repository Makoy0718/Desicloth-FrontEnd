import { Routes } from '@angular/router';
import { AplicacionComponent } from './components/aplicacion/aplicacion.component';
import { InsertareditarComponent } from './components/aplicacion/insertareditar/insertareditar.component';
import { ListarproductoComponent } from './components/producto/listarproducto/listarproducto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { IsertareditarCategoriaComponent } from './components/categoria/isertareditar-categoria/isertareditar-categoria.component';
import { DisenoComponent } from './components/diseno/diseno.component';
import { ListardisenoComponent } from './components/diseno/listardiseno/listardiseno.component';
import { CreardisenoComponent } from './components/diseno/creardiseno/creardiseno.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { InsertareditarGaleriaComponent } from './components/galeria/insertareditar-galeria/insertareditar-galeria.component';
import { GeneroComponent } from './components/genero/genero.component';
import { InsertareditargenComponent } from './components/genero/insertareditargen/insertareditargen.component';
import { UsersComponent } from './components/users/users.component';
import { InsertareditarusersComponent } from './components/users/insertareditarusers/insertareditarusers.component';
import { ReclamoComponent } from './components/reclamo/reclamo.component';
import { InsertareditarrecComponent } from './components/reclamo/insertareditarrec/insertareditarrec.component';


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
    {
        path:'rutaGaleria',
        component:GaleriaComponent,
        children: [
            {
                path: 'insertarGaleria',
                component: InsertareditarGaleriaComponent,
            },
            {
                path: 'edicionesGaleria/:id',
                component: InsertareditarGaleriaComponent,
            },
        ],
    },
    {
    path:'rutagenero',component:GeneroComponent,
        children: [
            {
                path: 'insertarGenero',
                component: InsertareditargenComponent,
            },
            {
                path: 'edicionesGenero/:id',
                component: InsertareditargenComponent,
            },
        ],
    },
    {
    path:'rutausers',component:UsersComponent,
        children: [
            {
                path: 'insertarUsers',
                component: InsertareditarusersComponent,
            },
            {
                path: 'edicionesUsers/:id',
                component: InsertareditarusersComponent,
            },
        ],
    },
    {
    path:'rutareclamo',component:ReclamoComponent,
        children: [
            {
                path: 'insertarReclamo',
                component: InsertareditarrecComponent,
            },
            {
                path: 'edicionesReclamo/:id',
                component: InsertareditarrecComponent,
            },
        ],
    },


     // Ruta comodín (opcional)
    { path: '**', redirectTo: 'productos' },
];

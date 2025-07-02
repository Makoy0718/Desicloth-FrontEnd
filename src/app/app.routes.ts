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
import { LandingComponent } from './components/landing/landing.component';
import { RoleComponent } from './components/role/role.component';
import { ListarroleComponent } from './components/role/listarrole/listarrole.component';
import { InsertareditarroleComponent } from './components/role/insertareditarrole/insertareditarrole.component';


//RUTAS DEL FRONTEND
export const routes: Routes = [
    
    {
        path: 'rutaproductos',
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
        component:RoleComponent,
        children:[
			{ 
				path:'insertarrole',
				component:InsertareditarroleComponent
			},
			{ 
				path:'editarrole/:id',
				component:InsertareditarroleComponent
			}
    	]
    },
    {   
        path:'rutacategorias',
        component:CategoriaComponent,
        children: [
            {
                path: 'insertarcategoria',
                component: IsertareditarCategoriaComponent,
            },
            {
                path: 'edicionescategoria/:id',
                component: IsertareditarCategoriaComponent,
            },
        ],
        
    },
	  {
        path: 'rutadisenos',
        component: DisenoComponent,
        children:[
            { 
                path: 'listardiseno',
                component: ListardisenoComponent
            },{ 
                path: 'insertardiseno',
                component: CreardisenoComponent
            },{
                path: 'edicionesdiseno/:id',
                component: CreardisenoComponent,
            },
        ]
    },
    {
        path:'rutagaleria',
        component:GaleriaComponent,
        children: [
            {
                path: 'insertagaleria',
                component: InsertareditarGaleriaComponent,
            },
            {
                path: 'edicionesgaleria/:id',
                component: InsertareditarGaleriaComponent,
            },
        ],
    },
    {
    path:'rutagenero',component:GeneroComponent,
        children: [
            {
                path: 'insertargenero',
                component: InsertareditargenComponent,
            },
            {
                path: 'edicionesgenero/:id',
                component: InsertareditargenComponent,
            },
        ],
    },
    {
    path:'rutausers',component:UsersComponent,
        children: [
            {
                path: 'insertarusers',
                component: InsertareditarusersComponent,
            },
            {
                path: 'edicionesusers/:id',
                component: InsertareditarusersComponent,
            },
        ],
    },
    {
    path:'rutareclamo',component:ReclamoComponent,
        children: [
            {
                path: 'insertarreclamo',
                component: InsertareditarrecComponent,
            },
            {
                path: 'edicionesreclamo/:id',
                component: InsertareditarrecComponent,
            },
        ],
    },
	{
    path:'rutalanding',component:LandingComponent,
    },



     // Ruta comodín (opcional)
    { path: '', redirectTo: 'rutalanding', pathMatch: 'full' },
];

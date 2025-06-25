import { Routes } from '@angular/router';
import { AplicacionComponent } from './components/aplicacion/aplicacion.component';
import { InsertareditarComponent } from './components/aplicacion/insertareditar/insertareditar.component';
import { ListarproductoComponent } from './components/producto/listarproducto/listarproducto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { IsertareditarCategoriaComponent } from './components/categoria/isertareditar-categoria/isertareditar-categoria.component';
import { DisenoComponent } from './components/diseno/diseno.component';
import { CreardisenoComponent } from './components/diseno/creardiseno/creardiseno.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { InsertareditarGaleriaComponent } from './components/galeria/insertareditar-galeria/insertareditar-galeria.component';
import { GeneroComponent } from './components/genero/genero.component';
import { InsertareditargenComponent } from './components/genero/insertareditargen/insertareditargen.component';
import { UsersComponent } from './components/users/users.component';
import { InsertareditarusersComponent } from './components/users/insertareditarusers/insertareditarusers.component';
import { RoleComponent } from './components/role/role.component';
import { ListarroleComponent } from './components/role/listarrole/listarrole.component';
import { InsertareditarRoleComponent } from './components/role/insertareditar-role/insertareditar-role.component';
import { LandingComponent } from './components/landing/landing.component';


//RUTAS DEL FRONTEND
export const routes: Routes = [
    //Rutas para componentes de Producto
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
	//Rutas para componentes de Rol
    {
        path: 'rutaRoles',
        component:RoleComponent,
        children:[
			{ 
				path:'insertarRole',
				component:InsertareditarRoleComponent
			},
			{ 
				path:'editarRole/:id',
				component:InsertareditarRoleComponent
			}
    	]
    },
	//Rutas para componentes de Categoria
    {   
        path:'rutaCategorias',
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
	//Rutas para componentes de Diseno
	  {
        path: 'rutaDisenos',
        component: DisenoComponent,
        children:[
            { 
                path: 'insertarDiseno',
                component: CreardisenoComponent
            },
            {
                path: 'edicionDiseno/:id',
                component: CreardisenoComponent,
            }
        ]
    },
	//Rutas para componentes de Galeria
    {
        path:'rutaGalerias',
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
	//Rutas para componentes de Genero
    {
    path:'rutaGeneros',component:GeneroComponent,
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
	//Rutas para componentes de Users
    {
    path:'rutaUsers',component:UsersComponent,
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
    path:'rutaLanding',component:LandingComponent,
    },
     // Ruta comodín (opcional)
    { path: '', redirectTo: 'rutaLanding', pathMatch: 'full' }, // Redirige a la ruta de inicio
];

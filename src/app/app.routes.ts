import { Routes } from '@angular/router';
import { AplicacionComponent } from './components/aplicacion/aplicacion.component';
import { InsertareditarComponent } from './components/aplicacion/insertareditar/insertareditar.component';
import { ListarproductoComponent } from './components/producto/listarproducto/listarproducto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { IsertareditarCategoriaComponent } from './components/categoria/isertareditar-categoria/isertareditar-categoria.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { InsertareditarGaleriaComponent } from './components/galeria/insertareditar-galeria/insertareditar-galeria.component';
import { GeneroComponent } from './components/genero/genero.component';
import { InsertareditargenComponent } from './components/genero/insertareditargen/insertareditargen.component';
import { UsersComponent } from './components/users/users.component';
import { InsertareditarusersComponent } from './components/users/insertareditarusers/insertareditarusers.component';
import { ReclamoComponent } from './components/reclamo/reclamo.component';
import { InsertareditarrecComponent } from './components/reclamo/insertareditarrec/insertareditarrec.component';
<<<<<<< Updated upstream
=======
import { LandingComponent } from './components/landing/landing.component';
import { RoleComponent } from './components/role/role.component';
import { ListarroleComponent } from './components/role/listarrole/listarrole.component';
import { InsertareditarroleComponent } from './components/role/insertareditarrole/insertareditarrole.component';
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { BuscargaleriaComponent } from './components/galeria/buscargaleria/buscargaleria.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportedisenosComponent } from './components/dashboard/reportedisenos/reportedisenos.component';
import { ReporteraitingComponent } from './components/dashboard/reporteraiting/reporteraiting.component';
import { BuscarcategoriaComponent } from './components/categoria/buscarcategoria/buscarcategoria.component';
import { ReportecategoriaComponent } from './components/dashboard/reportecategoria/reportecategoria.component';
import { BuscarusersComponent } from './components/users/buscarusers/buscarusers.component';
import { BuscargeneroComponent } from './components/genero/buscargenero/buscargenero.component';
>>>>>>> Stashed changes


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
            {
                path: 'busquedagenero',
                component: BuscargeneroComponent,
                data: { roles: ['ADMIN'] }
            },
        ],
    },
    {
    path:'rutausers',component:UsersComponent,
        children: [
            {
                path: 'insertarUsers',
                component: InsertareditarusersComponent,
                data: { roles: ['ADMIN'] }
            },
            {
                path: 'edicionesUsers/:id',
                component: InsertareditarusersComponent,
                data: { roles: ['ADMIN'] }
            },
            {
                path: 'busquedausers',
                component: BuscarusersComponent,
                data: { roles: ['ADMIN'] }
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

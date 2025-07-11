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
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { InsertareditarpedidoComponent } from './components/pedido/insertareditarpedido/insertareditarpedido.component';
import { PagoComponent } from './components/pago/pago.component';
import { InsertareditarpagoComponent } from './components/pago/insertareditarpago/insertareditarpago.component';
import { BuscargaleriaComponent } from './components/galeria/buscargaleria/buscargaleria.component';
import { BuscargeneroComponent } from './components/genero/buscargenero/buscargenero.component';
import { BuscarusersComponent } from './components/users/buscarusers/buscarusers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportedisenosComponent } from './components/dashboard/reportedisenos/reportedisenos.component';
import { ReporteraitingComponent } from './components/dashboard/reporteraiting/reporteraiting.component';
import { ReportecategoriaComponent } from './components/dashboard/reportecategoria/reportecategoria.component';
import { MisdisenosComponent } from './components/diseno/misdisenos/misdisenos.component';
import { BuscarreclamoComponent } from './components/reclamo/buscarreclamo/buscarreclamo.component';
import { ReporteiaComponent } from './components/dashboard/reporteia/reporteia.component';
import { ReportedisenosporgeneroComponent } from './components/dashboard/reportedisenosporgenero/reportedisenosporgenero.component';

import { BusquedapagoComponent } from './components/pago/busquedapago/busquedapago.component';




import { BuscarcategoriaComponent } from './components/categoria/buscarcategoria/buscarcategoria.component';
import { ReporteTop5PagosComponent } from './components/dashboard/reportepago/reportepago.component';
import { ReportePagosUsuarioComponent } from './components/dashboard/reportepago-usuario/reportepago-usuario.component';


//RUTAS DEL FRONTEND
export const routes: Routes = [
    //Rutas y subrutas de productos
    {
        path: 'rutaproductos',
        component: ListarproductoComponent,
        children:[
            { 
                path: '',
                component: ListarproductoComponent
            }
            //{path: 'insertar', component: ProductoInsertarComponent }, //productos/insertar
        ],
        canActivate: [seguridadGuard],
    },
    //Rutas y subrutas de role
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
				component:InsertareditarroleComponent,
			}
    	],
        data: { roles: ['ADMIN'], renderMode: 'no-prerender' },
        canActivate: [seguridadGuard],
    },
    //Rutas y subrutas de categoria
    {   
        path:'rutacategorias',
        component:CategoriaComponent,
        children: [
            {
                path: 'insertarcategoria',
                component: IsertareditarCategoriaComponent,
                data: { roles: ['ADMIN'] }
            },
            {
                path: 'edicionescategoria/:id',
                component: IsertareditarCategoriaComponent,
                data: { roles: ['ADMIN']}
            },
            {
                path:'busquedacategoria',
                component:BuscarcategoriaComponent,
                data: { roles: ['ADMIN', 'CLIENTE'] }
            },
        ],
        canActivate: [seguridadGuard],
        data: { renderMode: 'no-prerender' },
    },
    //Rutas y subrutas disenos
	{
        path: 'rutadisenos',
        component: DisenoComponent,
        children:[
            { 
                path: 'insertardiseno',
                component: CreardisenoComponent,
                data: { roles: ['ADMIN', 'CLIENTE'] }
            },
            {
                path: 'edicionesdiseno/:id',
                component: CreardisenoComponent,
                data: { roles: ['ADMIN']}
            },
            {
                path: 'misdisenos',
                component: MisdisenosComponent,
                data: { roles: ['ADMIN', 'CLIENTE'] }
            },
        ],
        canActivate: [seguridadGuard],
        data: { renderMode: 'no-prerender' },
    },
    //Rutas y subrutas de galeria
    {
        path:'rutagaleria',
        component:GaleriaComponent,
        children: [
            {
                path: 'insertagaleria',
                component: InsertareditarGaleriaComponent,
                data: { roles: ['ADMIN', 'CLIENTE'] }
            },
            {
                path: 'edicionesgaleria/:id',
                component: InsertareditarGaleriaComponent,
                data: { roles: ['ADMIN', 'CLIENTE']}
            },
            {
                path:'busquedagaleria',
                component:BuscargaleriaComponent,
                data: { roles: ['ADMIN', 'CLIENTE'] }
            },
            
        ],
        canActivate: [seguridadGuard],
        data: { renderMode: 'no-prerender' },
    },
    //Rutas y subrutas de genero
    {
        path:'rutagenero',component:GeneroComponent,
        children: [
            {
                path: 'insertargenero',
                component: InsertareditargenComponent,
                data: { roles: ['ADMIN'] }
            },
            {
                path: 'edicionesgenero/:id',
                component: InsertareditargenComponent,
                data: { roles: ['ADMIN']}
            },
            {
                path: 'busquedagenero',
                component: BuscargeneroComponent,
                data: { roles: ['ADMIN'] }
            },
        ],
        canActivate: [seguridadGuard],
        data: { renderMode: 'no-prerender' },
    },
    //Rutas y subrutas de users
    {
        path:'rutausers',component:UsersComponent,
        children: [
            {
                path: 'insertarusers',
                component: InsertareditarusersComponent,
                data: { roles: ['ADMIN', 'CLIENTE'] }
            },
            {
                path: 'edicionesusers/:id',
                component: InsertareditarusersComponent,
                canActivate: [seguridadGuard],
                data: { roles: ['ADMIN'] }
            },
            {
                path: 'busquedausers',
                component: BuscarusersComponent,
                canActivate: [seguridadGuard],
                data: { roles: ['ADMIN'] }
            },
        ],
        data: { renderMode: 'no-prerender' },
        
    },
    //Rutas y subrutas de reclamo
    {
        path:'rutareclamo',component:ReclamoComponent,
        children: [
            {
                path: 'insertarreclamo',
                component: InsertareditarrecComponent,
                data: { roles: ['ADMIN', 'CLIENTE'] }
            },
            {
                path: 'edicionesreclamo/:id',
                component: InsertareditarrecComponent,
                data: { roles: ['ADMIN'] }
            },
            {
                path: 'busquedareclamo',
                component: BuscarreclamoComponent,
                data: { roles: ['ADMIN'] }
            },
        ],
        canActivate: [seguridadGuard],
        data: { renderMode: 'no-prerender' },
    },
    //Ruta y subrutas de pedido
    {
        path:'rutapedidos',component:PedidoComponent,
        children:[
            {
                path:'insertarpedido',
                component: InsertareditarpedidoComponent,
                data: { roles: ['ADMIN', 'CLIENTE'] }
            },
            {
                path:'edicionespedido/:id',
                component:InsertareditarpedidoComponent,
                data: { roles: ['ADMIN'] }
            }, 
        ],
        canActivate: [seguridadGuard],
        data: { renderMode: 'no-prerender' },
    },
    //Ruta y subrutas de pago
    {
        path:'rutapagos',component:PagoComponent,
        children:[
            {
                path:'insertarpago',
                component: InsertareditarpagoComponent,
                data: { roles: ['ADMIN', 'CLIENTE'] }
            },
            {
                path:'edicionespago/:id',
                component:InsertareditarpagoComponent,
                data: { roles: ['ADMIN'] }
            },
            {
                path:'buscarPorMetodo',
                component:BusquedapagoComponent,
                data: { roles: ['ADMIN', 'CLIENTE'] }
            },
        ],
        canActivate: [seguridadGuard],
        data: { renderMode: 'no-prerender' },
    },
    //Rutas de todo lo relacionado con  dashboard y los reportes
    {
        path:'rutadashboard',component:DashboardComponent,
        children: [
            {
                path: 'reportediseno',
                component: ReportedisenosComponent,
            },
            {
                path:'comparacionraiting',
                component:ReporteraitingComponent,
            },
            {
                path:'conteodisenoporcategoria',
                component:ReportecategoriaComponent,
            },
            {
                path:'reporteia',
                component:ReporteiaComponent,
            },
            {
                path:'reportedisenosporgenero',
                component:ReportedisenosporgeneroComponent,
            },
            {
                path:'reportepago',
                component:ReportePagosUsuarioComponent,
            },
            {
                path:'reportepagousuario',
                component:ReporteTop5PagosComponent,
            },



            
        ],
        data: { roles: ['ADMIN'] },
        canActivate: [seguridadGuard],
    },


    //Ruta de la landing page
	{
        path:'rutalanding',
        component: LandingComponent,
    },
    //Ruta de login
    {
        path:'login',
        component: LoginComponent,
    },
    //Ruta de home
    {
        path:'home',
        component: HomeComponent,
    },
    // Ruta comodín (opcional)
    { 
        path: '', 
        redirectTo: 'rutalanding', 
        pathMatch: 'full' 
    },
];

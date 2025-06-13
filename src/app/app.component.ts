import { Component } from '@angular/core';
import { GeneroComponent } from "./components/genero/genero.component";
import { ProductoComponent } from './components/producto/producto.component';

@Component({
  selector: 'app-root',
<<<<<<< Updated upstream
  imports: [GeneroComponent],
=======
  imports: [AplicacionComponent, GeneroComponent,ProductoComponent],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Desicloth-ForntEnd';
}

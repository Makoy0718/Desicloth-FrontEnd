import { Component } from '@angular/core';
import { GeneroComponent } from "./components/genero/genero.component";
import { ProductoComponent } from './components/producto/producto.component';

@Component({
  selector: 'app-root',
  imports: [ GeneroComponent,ProductoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Desicloth-ForntEnd';
}

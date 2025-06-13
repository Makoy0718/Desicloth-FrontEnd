import { Component } from '@angular/core';
import { AplicacionComponent } from './components/aplicacion/aplicacion.component';
import { GeneroComponent } from "./components/genero/genero.component";

@Component({
  selector: 'app-root',
  imports: [AplicacionComponent, GeneroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Desicloth-ForntEnd';
}

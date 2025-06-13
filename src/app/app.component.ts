import { Component } from '@angular/core';
import { AplicacionComponent } from './components/aplicacion/aplicacion.component';

@Component({
  selector: 'app-root',
  imports: [AplicacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Desicloth-ForntEnd';
}

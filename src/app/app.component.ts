import { Component } from '@angular/core';
import { ProductoComponent } from './components/producto/producto.component';


@Component({
  selector: 'app-root',
  imports: [ ProductoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Desicloth-ForntEnd';
}

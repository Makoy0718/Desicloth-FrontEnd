import { Component } from '@angular/core';
import { GeneroComponent } from "./components/genero/genero.component";

@Component({
  selector: 'app-root',
  imports: [GeneroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Desicloth-ForntEnd';
}

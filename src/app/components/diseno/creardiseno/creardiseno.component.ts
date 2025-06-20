import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DisenoService } from '../../../services/diseno.service';
import { Diseno } from '../../../models/diseno';
import { Categoria } from '../../../models/categoria';
import { Genero } from '../../../models/genero';
import { Producto } from '../../../models/producto';

import { GoogleGenAI, Modality } from "@google/genai";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductoService } from '../../../services/producto.service';
import { GeneroService } from '../../../services/genero.service';
import { CategoriaService } from '../../../services/categoria.service';


@Component({
  selector: 'app-creardiseno',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, MatRadioModule, MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatIconModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creardiseno.component.html',
  styleUrl: './creardiseno.component.css'
})
export class CreardisenoComponent {
	form: FormGroup;
  	imagenGenerada: string = "";
  	categorias: Categoria[] = [];
  	generos: Genero[] = [];
  	productos: Producto[] = [];

	//Iniciamos el gemini para poder usarlo en el componente
	GeminiAI: GoogleGenAI = new GoogleGenAI({ apiKey: "AIzaSyB_r3HqUXYRNoApZB_X_FvUYqfQFaVj0l8" });
	imagenBase64: string = '';
	
	constructor(private fb: FormBuilder, private disenoService: DisenoService, private categoriaService: CategoriaService, private generoService: GeneroService, private productoService: ProductoService) {
		this.form = this.fb.group({
			imagenDiseno: [''],
			precioDiseno: [0],
			fechaOrigenDiseno: [new Date()],
			tipoIA: [false],
			tipoOrigenDiseno: [''],
			promtDiseno: [''],
			respuestaTextoDiseno: [''],
			categoria: [null],
			genero: [null],
			producto: [null]
		});
	}

	ngOnInit() {
		this.categoriaService.list().subscribe(data => this.categorias = data);
		this.generoService.list().subscribe(data => this.generos = data);
		this.productoService.list().subscribe(data => this.productos = data);
	}

	async generarImagen() {
  		const prompt = this.form.get('promtDiseno')?.value;
  		if (!prompt) return;

  		try {
    		const result = await this.GeminiAI.models.generateContent({
      		model: 'gemini-2.0-flash-preview-image-generation',
      		contents: prompt,
      		config: {
        		responseModalities: [Modality.TEXT, Modality.IMAGE]
      		}
    		});

    		if (result.candidates && result.candidates.length > 0) {
      			const candidate = result.candidates[0];

      			if (candidate.content && candidate.content.parts) {
        			const parts = candidate.content.parts;

        			for (const part of parts) {
          				if (part.text) {
            				this.form.patchValue({ respuestaTextoDiseno: part.text });
          				} else if (part.inlineData?.data) {
            				const base64Img = `data:image/png;base64,${part.inlineData.data}`;
            				this.imagenBase64 = base64Img;
            				this.form.patchValue({ imagenDiseno: base64Img });
							this.imagenGenerada = base64Img;
          				}
        			}
      			} else {
        			console.warn('El candidato no contiene partes de contenido.');
      			}
    		} else {
      			console.warn('Gemini no devolvió candidatos.');
    		}
  		} catch (error) {
    		console.error('Error al generar imagen con Gemini:', error);
  		}
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;

		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			const reader = new FileReader();

			reader.onload = () => {
				const base64Img = reader.result as string;
				this.imagenBase64 = base64Img;
				this.imagenGenerada = base64Img;
				this.form.patchValue({ imagenDiseno: base64Img });
			};

			reader.readAsDataURL(file);
		}
	}


	aceptar() {
		const diseno: Diseno = this.form.value;

		diseno.tipoOrigenDiseno = this.form.get('tipoIA')?.value ? 'IA' : 'Manual';
		diseno.fechaOrigenDiseno = new Date(); // fecha actual

		this.disenoService.insertDiseno(diseno).subscribe(() => {
			alert('Diseño registrado correctamente');
			this.form.reset();
			this.imagenBase64 = '';
			this.imagenGenerada = '';
		});
	}
}

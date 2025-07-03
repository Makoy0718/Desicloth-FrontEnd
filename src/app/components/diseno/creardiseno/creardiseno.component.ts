import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ActivatedRoute, Params } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { Galeria } from '../../../models/galeria';
import { GaleriaService } from '../../../services/galeria.service';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'app-creardiseno',
  imports: [
	MatInputModule, MatFormFieldModule, 
	ReactiveFormsModule, CommonModule, 
	MatRadioModule, MatSelectModule, 
	MatButtonModule, MatDatepickerModule, 
	MatNativeDateModule, MatSlideToggleModule, 
	MatIconModule,],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creardiseno.component.html',
  styleUrl: './creardiseno.component.css'
})
export class CreardisenoComponent {
	form: FormGroup = new FormGroup({});
	diseno: Diseno = new Diseno();

  	imagenGenerada: string = "";
  	categorias: Categoria[] = [];
  	generos: Genero[] = [];
  	productos: Producto[] = [];
	galerias: Galeria[] = [];
	users: Users[] = [];

	id: number = 0;
  	edicion: boolean = false;

	//Iniciamos el gemini para poder usarlo en el componente
	GeminiAI: GoogleGenAI = new GoogleGenAI({ apiKey: "Clave Gemini AI });
	imagenBase64: string = '';
	
	constructor(
		private fb: FormBuilder, private disenoService: DisenoService, 
		private categoriaService: CategoriaService, private generoService: GeneroService, 
		private productoService: ProductoService, private galeriaService: GaleriaService,
		private usersService: UsersService, private route: ActivatedRoute) {
}

	ngOnInit() {
		this.route.params.subscribe((data: Params) => {
			this.id = data['id'];
			this.edicion = data['id'] != null;
			//actualizar trae data
			this.init();
			console.log('Valor de id desde ruta:', this.id);
		});

		this.form = this.fb.group({
			idDiseno: [''],
			imagenDiseno: ['', Validators.required],
			precioDiseno: [0, Validators.required],
			fechaOrigenDiseno: [new Date(), Validators.required],
			tipoIA: [false, Validators.required],
			promtDiseno: [''],
			respuestaTextoDiseno: [''],
			categoria: [null, Validators.required],
			genero: [null, Validators.required],
			producto: [null, Validators.required],
			galeria: [null, Validators.required],
			user: [null, Validators.required]
		});

		this.form.get('tipoIA')?.valueChanges.subscribe((valor) => {
			this.form.patchValue({
			  tipoOrigenDiseno: valor ? 'IA' : 'Manual'
			});
		});

		this.categoriaService.list().subscribe(data => this.categorias = data);
		this.generoService.list().subscribe(data => this.generos = data);
		this.productoService.list().subscribe(data => this.productos = data);
		this.galeriaService.list().subscribe(data => this.galerias = data);	
		this.usersService.list().subscribe(data => this.users = data);

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
		if (!this.form.valid) {
			console.warn("Formulario inválido:", this.form.value);
			return;
		}
		if (this.form.valid) {
			this.diseno.idDiseno = this.form.value.idDiseno;
			this.diseno.fechaOrigenDiseno = this.form.value.fechaOrigenDiseno;
			this.diseno.imagenDiseno = this.form.value.imagenDiseno;
			this.diseno.precioDiseno = this.form.value.precioDiseno;
			this.diseno.promtDiseno = this.form.value.promtDiseno;
			this.diseno.respuestaTextoDiseno = this.form.value.respuestaTextoDiseno;
			this.diseno.tipoOrigenDiseno = this.form.get('tipoIA')?.value ? 'IA' : 'Manual';
			this.diseno.categoria = this.form.value.categoria
			this.diseno.genero =this.form.value.genero;
			this.diseno.producto =this.form.value.producto;
			this.diseno.users = this.form.value.user;
			

			if (this.edicion) {
				this.diseno.idDiseno = this.id; // Asegúrate que tu modelo tenga este campo
				this.disenoService.updateDiseno(this.diseno).subscribe(() => {
					this.disenoService.listDiseno().subscribe((data) => {
						this.disenoService.setListDiseno(data);
					});
				});
			} else {
				this.disenoService.insertDiseno(this.diseno).subscribe(() => {
					this.disenoService.listDiseno().subscribe((data) => {
						this.disenoService.setListDiseno(data);
					});
				});
			}

			this.form.reset();
			this.imagenBase64 = '';
			this.imagenGenerada = '';
		}
	}

	init() {
		if (this.edicion) {
			this.disenoService.listIdDiseno(this.id).subscribe((data) => {
				this.form.patchValue({
					idDiseno: data.idDiseno,
					imagenDiseno: data.imagenDiseno,
					precioDiseno: data.precioDiseno,
					fechaOrigenDiseno: new Date(data.fechaOrigenDiseno),
					tipoIA: data.tipoOrigenDiseno === 'IA',
					tipoOrigenDiseno: data.tipoOrigenDiseno,
					promtDiseno: data.promtDiseno,
					respuestaTextoDiseno: data.respuestaTextoDiseno,
					categoria: data.categoria,
					genero: data.genero,
					producto: data.producto
				});

				this.imagenBase64 = data.imagenDiseno;
				this.imagenGenerada = data.imagenDiseno;
			});
		}
	}
}

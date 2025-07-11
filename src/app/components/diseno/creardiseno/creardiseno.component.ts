import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { Galeria } from '../../../models/galeria';
import { GaleriaService } from '../../../services/galeria.service';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { LoginService } from '../../../services/login.service';
import { GaleriadisenoService } from '../../../services/galeriadiseno.service';
import { GaleriaDiseno } from '../../../models/galeriadiseno';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-creardiseno',
  imports: [
	MatInputModule, MatFormFieldModule, 
	ReactiveFormsModule, CommonModule, 
	MatRadioModule, MatSelectModule, 
	MatButtonModule, MatDatepickerModule, 
	MatNativeDateModule, MatSlideToggleModule, 
	MatIconModule, MatCardModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './creardiseno.component.html',
  styleUrl: './creardiseno.component.css'
})
export class CreardisenoComponent implements OnInit{
	form: FormGroup = new FormGroup({});
	diseno: Diseno = new Diseno();
	galeriaDiseno: GaleriaDiseno = new GaleriaDiseno();

  	imagenGenerada: string = "";
  	categorias: Categoria[] = [];
  	generos: Genero[] = [];
  	productos: Producto[] = [];
	galerias: Galeria[] = [];
	user: Users = new Users();

	idUser: number = 0;

	id: number = 0;
  	edicion: boolean = false;

	//Iniciamos el gemini para poder usarlo en el componente
	GeminiAI: GoogleGenAI = new GoogleGenAI({ apiKey: "AIzaSyDUbwHdIZQE7lsbh6ffwZD7Ozj739-hdXI" });
  
	imagenBase64: string = '';
	
	//Constructor donde llamamos todos los servicios
	constructor(
		private fb: FormBuilder, private disenoService: DisenoService, 
		private categoriaService: CategoriaService, private generoService: GeneroService, 
		private productoService: ProductoService, private galeriaService: GaleriaService,
		private usersService: UsersService, private route: ActivatedRoute,
		private loginService: LoginService, private galeriadisenoService: GaleriadisenoService,
		private router: Router
	) {
	}

	//Funcion al cargar el componente
	ngOnInit() {
		//Funcion que se encarga de reconocer si se va a editar
		this.route.params.subscribe((data: Params) => {
			this.id = data['id'];
			this.edicion = data['id'] != null;
			//actualizar trae data
			this.init();
			console.log('Valor de id desde ruta:', this.id);
		});

		//Funcion que inicializar el formulario con validar
		if(this.edicion){
			this.form = this.fb.group({
				idDiseno: [''],
				imagenDiseno: ['', Validators.required],
				precioDiseno: [0, [Validators.required, Validators.max(35)]],
				fechaOrigenDiseno: [new Date(), Validators.required],
				tipoIA: [false, Validators.required],
				promtDiseno: [''],
				respuestaTextoDiseno: [''],
				categoria: [null, Validators.required],
				genero: [null, Validators.required],
				producto: [null, Validators.required],
				galeria: [null],
				comentarioDiseno: ['']
			});
		} else {
			this.form = this.fb.group({
				idDiseno: [''],
				imagenDiseno: ['', Validators.required],
				precioDiseno: [0, [Validators.required, Validators.max(35)]],
				fechaOrigenDiseno: [new Date(), Validators.required],
				tipoIA: [false, Validators.required],
				promtDiseno: [''],
				respuestaTextoDiseno: [''],
				categoria: [null, Validators.required],
				genero: [null, Validators.required],
				producto: [null, Validators.required],
				galeria: [null, Validators.required],
				comentarioDiseno: ['', Validators.required]
			});
		}
		

		//Funcion de que se encarga de toglear si el diseno se genera por IA o Manual
		this.form.get('tipoIA')?.valueChanges.subscribe((valor) => {
			this.form.patchValue({
			  tipoOrigenDiseno: valor ? 'IA' : 'Manual'
			});
		});

		this.obtenerIdUsuario();
		
		//Funciones que se encargan de cargar las listas
		this.categoriaService.list().subscribe(data => this.categorias = data);
		this.generoService.list().subscribe(data => this.generos = data);
		this.productoService.list().subscribe(data => this.productos = data);	

	}

	//Funcion para generar imagen
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

							// Procesar la imagen para recortar y comprimir
							const imagenProcesada = await this.procesarBase64Imagen(base64Img, 500, 0.5);

							this.imagenBase64 = imagenProcesada;
							this.form.patchValue({ imagenDiseno: imagenProcesada });
							this.imagenGenerada = imagenProcesada;
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

	procesarBase64Imagen(base64: string, size = 500, calidad = 0.5): Promise<string> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = size;
				canvas.height = size;
				const ctx = canvas.getContext('2d');
				if (!ctx) {
					reject('No se pudo obtener contexto de canvas');
					return;
				}

				const sideLength = Math.min(img.width, img.height);
				const startX = (img.width - sideLength) / 2;
				const startY = (img.height - sideLength) / 2;

				ctx.drawImage(
					img,
					startX, startY,
					sideLength, sideLength,
					0, 0,
					size, size
				);

				const compressedBase64 = canvas.toDataURL('image/jpeg', calidad);
				resolve(compressedBase64);
			};
			img.onerror = (err) => reject(err);
			img.src = base64;
		});
	}

	//Funcion para cargar imagen cuando se carga archivo
	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;

		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			const reader = new FileReader();

			reader.onload = () => {
				const img = new Image();
				img.onload = () => {
					// Crear canvas para procesar la imagen cuadrada
					const canvas = document.createElement('canvas');

					// Definir tamaño final cuadrado (ejemplo 500x500 px)
					const size = 500;

					canvas.width = size;
					canvas.height = size;

					const ctx = canvas.getContext('2d');
					if (!ctx) return;

					// Calcular lado menor para recortar el cuadrado del centro de la imagen
					const sideLength = Math.min(img.width, img.height);

					// Coordenadas para recorte centrado
					const startX = (img.width - sideLength) / 2;
					const startY = (img.height - sideLength) / 2;

					// Dibujar la imagen recortada y redimensionada al canvas cuadrado
					ctx.drawImage(
					img,
					startX, startY,          // punto inicial en la imagen original
					sideLength, sideLength,  // tamaño del recorte cuadrado
					0, 0,                    // punto inicial en el canvas
					size, size               // tamaño final en canvas (cuadrado)
					);

					// Exportar como JPEG comprimido (calidad 0.5)
					const base64Img = canvas.toDataURL('image/jpeg', 0.5);

					this.imagenBase64 = base64Img;
					this.imagenGenerada = base64Img;
					this.form.patchValue({ imagenDiseno: base64Img });
				};
				img.src = reader.result as string;
			};

			reader.readAsDataURL(file);
		}
	}

	//Funcion para insertar diseno
	aceptar() {
		if (!this.form.valid) {
			console.warn("Formulario inválido:", this.form.value);
			return;
		}
		if (this.form.valid) {
			console.log(this.form)
			console.log(this.form.value.galeria)
			this.diseno.idDiseno = this.form.value.idDiseno;
			this.diseno.fechaOrigenDiseno = this.form.value.fechaOrigenDiseno;
			this.diseno.imagenDiseno = this.form.value.imagenDiseno;
			this.diseno.precioDiseno = this.form.value.precioDiseno;
			this.diseno.promtDiseno = this.form.value.promtDiseno;
			this.diseno.respuestaTextoDiseno = this.form.value.respuestaTextoDiseno;
			this.diseno.tipoOrigenDiseno = this.form.get('tipoIA')?.value ? 'IA' : 'Disenador';
			this.diseno.categoria = this.form.value.categoria
			this.diseno.genero =this.form.value.genero;
			this.diseno.producto =this.form.value.producto;
			this.diseno.users = this.user;

			
			this.galeriaDiseno.galeria.idGaleria = this.form.value.categoria.idCategoria
			this.galeriaDiseno.comentarios = this.form.value.comentarioDiseno
			

			if (this.edicion) {
				this.diseno.idDiseno = this.id; // Asegúrate que tu modelo tenga este campo
				this.disenoService.updateDiseno(this.diseno).subscribe(() => {
					this.disenoService.listDiseno().subscribe((data) => {
						this.disenoService.setListDiseno(data);
						this.router.navigate(['/rutadisenos']);
					});
				});
			} else {
				this.disenoService.insertDiseno(this.diseno).subscribe((disenoCreado) => {
					console.log(disenoCreado)
					this.galeriaDiseno.diseno.idDiseno = disenoCreado.idDiseno
					this.galeriadisenoService.insert(this.galeriaDiseno).subscribe(() => {
						this.galeriadisenoService.listGaleriaDiseno().subscribe((data)=>{
							this.galeriadisenoService.setListGaleriaDiseno(data);
						})
					})

					this.disenoService.listDiseno().subscribe((data) => {
						this.disenoService.setListDiseno(data);
						this.router.navigate(['/rutadisenos']);
					});
				});
			}

			this.form.reset();
			this.imagenBase64 = '';
			this.imagenGenerada = '';
		}
	}

	//Funcion para activar si es edicion
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

	obtenerIdUsuario() {
		const username = this.loginService.showUsername();
		console.log(username)

		this.usersService.searchUserByName(username).subscribe({
		next: (user) => {
			this.user = user; // Aquí asignas el id que venga del usuario
			this.galeriaService.getGaleriaByUsername(this.user.username).subscribe(data => this.galerias = data);
		}
		});
	}
}

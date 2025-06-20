import { Categoria } from "./categoria"
import { Genero } from "./genero"
import { Producto } from "./producto"

export class Diseno{
	idDiseno: number = 0
	imagenDiseno: string = ""
	precioDiseno: number = 0
	fechaOrigenDiseno: Date = new Date()
	tipoOrigenDiseno: string = ""
	promtDiseno: string = ""
	respuestaTextoDiseno: string = ""
	categoria: Categoria = new Categoria()
	genero: Genero = new Genero()
	producto: Producto = new Producto()
	//users: Users = new Users() //Para cuando se cree Users 
}
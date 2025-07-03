import { Diseno } from "./diseno"
import { Galeria } from "./galeria"

export class GaleriaDiseno {
    idGaleriaDiseno: number = 0
    galeria: Galeria = new Galeria()
    diseno: Diseno = new Diseno()
    comentarios: string = ""
}
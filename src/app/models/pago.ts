import { Pedido } from "./pedido"

export class Pago {
    idPago:number=0
    metodoPago:string=""
    montoPago:number=0
    comprobantePago:string=""
    fechaPago:Date=new Date()
    pedido: Pedido=new Pedido()
}

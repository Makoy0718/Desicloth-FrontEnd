import { Users } from "./users"

export class Pedido {
    idPedido:number=0
    fechaPedido:Date=new Date()
    estadoPedido:boolean=false
    users: Users = new Users()
}

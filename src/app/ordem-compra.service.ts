import { Pedido } from "./shared/pedido.model"

export class OrdemCompraService {
    public efetiverCompra(pedido:Pedido) {
        console.log("Pedido recebido: ", pedido)
    }
}
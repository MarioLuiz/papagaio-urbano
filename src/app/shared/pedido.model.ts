import { ItemCarrinho } from "./item-carrinho.model";

export class Pedido {
    public constructor(
        public endereco: string,
        public numero: number,
        public complemento: string,
        public formaPagamento: string,
        public itens: Array<ItemCarrinho>
    ) { }
}
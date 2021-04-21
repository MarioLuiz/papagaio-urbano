import { Injectable } from "@angular/core"
import { ItemCarrinho } from "./shared/item-carrinho.model"
import { Oferta } from "./shared/oferta.model"

@Injectable()
class CarrinhoService {
    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: Oferta | undefined): void {
        console.log('Oferta recebida no servico carrinho: ', oferta)
        let itemCarrinho:ItemCarrinho = new ItemCarrinho(
            oferta?.id,
            oferta?.imagens[0],
            oferta?.titulo,
            oferta?.descricao_oferta,
            oferta?.valor,
            1
        )
        console.log('itemCarrinho: ', itemCarrinho)
    }
}

export default CarrinhoService
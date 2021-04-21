import { Injectable } from "@angular/core"
import { ItemCarrinho } from "./shared/item-carrinho.model"

@Injectable()
class CarrinhoService {
    public itens: ItemCarrinho[] = []
}

export default CarrinhoService
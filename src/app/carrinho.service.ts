import { Injectable } from "@angular/core"
import { ItemCarrinho } from "./shared/item-carrinho.model"
import { Oferta } from "./shared/oferta.model"

@Injectable()
class CarrinhoService {
    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: Oferta): void {
        //console.log('Oferta recebida no servico carrinho: ', oferta)
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta?.id,
            oferta?.imagens[0].url,
            oferta?.titulo,
            oferta?.descricao_oferta,
            oferta?.valor,
            1
        )

        // verificar se o item em questão já não existe dentro de this.itens
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado) {
            (itemCarrinhoEncontrado.quantidade) ? itemCarrinhoEncontrado.quantidade += 1 : undefined
        } else {
            this.itens.push(itemCarrinho)
        }
        //console.log('itemCarrinho: ', itemCarrinho)
    }

    public totalCarrinhoCompras(): number {
        let total: number = 0
        this.itens.map((item: ItemCarrinho) => {
            total += (item.valor * item.quantidade)
        })
        return total
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        //Incrementar quantidade
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        }
    }

    public removerQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
        //Decrementar quantidade
        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade -= 1
            if (itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
            }
        }
    }

    public limparCarrinho(): void{
        this.itens = []
    }
}

export { CarrinhoService }
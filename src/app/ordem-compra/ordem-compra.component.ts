import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { OrdemCompraService } from '../ordem-compra.service'
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number | undefined;
  public itensCarrinho: ItemCarrinho[] = [];

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  });

  constructor(
    private ordemCompraService: OrdemCompraService,
    public carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
    console.log('Itens do carrinho: ', this.itensCarrinho);
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID') {
      console.log('Formulário: ', this.formulario.status)
      this.formulario.markAllAsTouched();
    } else {

      if (this.carrinhoService.exibirItens().length === 0) {
        alert('Você não possui nenhum item!')
        return
      }
      
      let pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento);
      console.log('Pedido : ', pedido)

      this.ordemCompraService.efetiverCompra(pedido)
        .subscribe((idPedido: number) => {
          this.idPedidoCompra = idPedido;
          console.log('idPedido : ', this.idPedidoCompra)
        })
    }
  }

  public calculaValorItemCarrinho(item: ItemCarrinho): any {
    if (item.quantidade && item.valor) {
      return item.quantidade * item.valor
    }
  }

  public adicionar(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item)
  }

  public diminuir(item: ItemCarrinho): void {
    this.carrinhoService.removerQuantidade(item)
  }
}

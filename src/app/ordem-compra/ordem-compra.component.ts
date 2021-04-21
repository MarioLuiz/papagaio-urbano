import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  });

  public idPedidoCompra: number | undefined;

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    console.log('Itens do carrinho: ', this.carrinhoService.exibirItens())
  }

  public confirmarCompra(): void {
    console.log('FormGroup', this.formulario)
    if (this.formulario.status === 'INVALID') {
      console.log('Formulário: ', this.formulario.status)
      this.formulario.markAllAsTouched();
    } else {
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
}

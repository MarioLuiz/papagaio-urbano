import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pedido } from '../shared/pedido.model';
import { OrdemCompraService } from './../ordem-compra.service';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  //Pedido
  public idPedidoCompra: number | undefined;

  @ViewChild('formulario') public formulario: NgForm | undefined;;

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit(): void {
    //this.ordemCompraService.efetiverCompra()
  }

  confirmarCompra(): void {

    console.log('Formulario: ', this.formulario)
    if (this.formulario?.valid) {
      let pedido: Pedido = new Pedido(
        this.formulario?.value.endereco,
        this.formulario?.value.numero,
        this.formulario?.value.complemento,
        this.formulario?.value.formaPagamento
      );

      this.ordemCompraService.efetiverCompra(pedido)
        .subscribe((idPedido: number) => {
          this.idPedidoCompra = idPedido
          console.log('Pedido cadastrado com sucesso, ID: ', idPedido)
        })
    }
  }
}

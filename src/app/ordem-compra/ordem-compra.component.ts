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
  public pedido: Pedido = new Pedido('', 0, '', '');
  public idPedidoCompra: number | undefined;

  @ViewChild('formulario')public formulario: NgForm | undefined;

  public endereco: string = '';
  public numero: string = '';
  public complemento: string = '';
  public formaPagamento: string = '';

  //controlar botão confirmar Compra
  public formEstado: string = 'disable';

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit(): void {
    //this.ordemCompraService.efetiverCompra()
  }

  confirmarCompra(): void {

    console.log('Formulario: ', this.formulario)
    this.pedido.endereco = this.endereco
    this.pedido.numero = Number.parseInt(this.numero)
    this.pedido.complemento = this.complemento
    this.pedido.formaPagamento = this.formaPagamento

    this.ordemCompraService.efetiverCompra(this.pedido)
      .subscribe((idPedido: number) => {
        this.idPedidoCompra = idPedido
      })
  }
}

import { Component, OnInit } from '@angular/core';
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
  public pedido: Pedido = new Pedido('',0,'','');

  public endereco: string = '';
  public numero: string = '';
  public complemento: string = '';
  public formaPagamento: string = '';

  // Controles de validação
  public enderecoValido: boolean | undefined
  public numeroValido: boolean | undefined
  public complementoValido: boolean | undefined
  public formaPagamentoValido: boolean | undefined

  // estados primitivos dos campos (prestine)
  public enderecoEstadoPrimitivo: boolean = true
  public numeroEstadoPrimitivo: boolean = true
  public complementoEstadoPrimitivo: boolean = true
  public formaPagamentoEstadoPrimitivo: boolean = true

  //controlar botão confirmar Compra
  public formEstado: string = 'disable';

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit(): void {
    //this.ordemCompraService.efetiverCompra()
  }

  atualizaEndereco(endereco: string): void {
    this.endereco = endereco;
    //console.log(this.endereco)
    this.enderecoEstadoPrimitivo = false
    if (endereco.length > 3) {
      this.enderecoValido = true;
    } else {
      this.enderecoValido = false;
    }
    this.habilitaForm()
  }

  atualizaNumero(numero: string): void {
    this.numero = numero;
    //console.log(this.numero)
    this.numeroEstadoPrimitivo = false
    if (Number.parseInt(numero) > 0) {
      this.numeroValido = true;
    } else {
      this.numeroValido = false;
    }
    this.habilitaForm()
  }

  atualizaComplemento(complemento: string): void {
    this.complemento = complemento;
    //console.log(this.complemento)
    this.complementoEstadoPrimitivo = false
    if (complemento) {
      this.complementoValido = true;
    } else {
      this.complementoValido = false;
    }
  }

  atualizaFormaPagamento(formaPagamento: string): void {
    this.formaPagamento = formaPagamento;
    this.formaPagamentoEstadoPrimitivo = false
    //console.log(this.formaPagamento)
    this.formaPagamentoEstadoPrimitivo = false
    if (formaPagamento) {
      this.formaPagamentoValido = true;
    } else {
      this.formaPagamentoValido = false;
    }
    this.habilitaForm()
  }

  habilitaForm(): void {
    if (this.enderecoValido && this.numeroValido && this.formaPagamentoValido) {
      this.formEstado = ''
    } else {
      this.formEstado = 'disable'
    }
  }

  confirmarCompra(): void {

    this.pedido.endereco = this.endereco
    this.pedido.numero = Number.parseInt(this.numero)
    this.pedido.complemento = this.complemento
    this.pedido.formaPagamento = this.formaPagamento

    this.ordemCompraService.efetiverCompra(this.pedido);
  }
}

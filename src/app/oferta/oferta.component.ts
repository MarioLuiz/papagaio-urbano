import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from './../ofertas.service';
import { interval, Observable, Observer, Subscription } from 'rxjs'
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta!: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertaPorId(parametros.id)
        .then((oferta: Oferta) => {
          this.oferta = oferta
        })
    })
    //console.log('Itens do carrinho: ', this.carrinhoService.exibirItens())
  }

  ngOnDestroy() {
  }

  adicionarItemCarrinho(): void {
    //console.log('Oferta Adicionada no carrinho: ', this.oferta)
    this.carrinhoService.incluirItem(this.oferta)
    console.log('Itens no carrinho: ', this.carrinhoService.exibirItens())
  }

}

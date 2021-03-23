import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from './../ofertas.service';
import { interval, Observable, Observer, Subscription } from 'rxjs'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  // Teste de Observer
  /* 
  private tempoObservableSubscription: Subscription = new Subscription;
  private meuObservableTesteSubscription: Subscription = new Subscription; 
  */
  public oferta: Oferta | undefined

  constructor(private route: ActivatedRoute,
    private ofertasService: OfertasService) {
  }

  ngOnInit(): void {
    this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
      .then((oferta: Oferta) => {
        this.oferta = oferta
      })



    // Teste de Observer
    /* 
    let tempo = interval(500)
    this.tempoObservableSubscription = tempo.subscribe((resposta:number)=>console.log(resposta))

    //observable (observavél)
    let meuObservableTeste = new Observable((observer : Observer<number>) => {
      observer.next(10)
      observer.next(15)
      observer.next(20)
      observer.next(25)
      observer.complete()
      //observer.error('algum erro foi encontrado na stream de eventos')
    });

    //observable (observador)
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado: number) => console.log('Resultado', resultado + 1),
      (erro: string) => console.log('Erro: ', erro),
      () => console.log('Stream de eventos foi finalizada')
    ) */
  }

  ngOnDestroy() {
    // Teste de Observer
    /* 
    this.meuObservableTesteSubscription.unsubscribe()
    this.tempoObservableSubscription.unsubscribe()
    */
  }

}

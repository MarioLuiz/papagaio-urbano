import { OfertasService } from './../ofertas.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]> | undefined
  //public ofertasPesquisadas: Oferta[] = [];
  private subjectPesquisa: Subject<string> = new Subject<string>()
  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa.pipe( //retorno Oferta[]
      debounceTime(1000), // Executa a ação do switchMap após 1 segundo
      distinctUntilChanged(), // previne pesquisa de termo identico ao termo anteriormente pesquisado
      switchMap((termo: string) => {
        //console.log('requisição http para api')
        if (termo.trim() === '') {
          // retorna um observable de array de ofertas vazio
          return of<Oferta[]>([])
        }

        return this.ofertasService.pesquisaOfertas(termo)
      }),
      catchError((erro: any, observable: Observable<Oferta[]>) => {
        console.log('Erro ao Pesquisar oferta: ', erro)
        return observable
      })
    )
    /* Código substituido pelo Pipe Async
    this.ofertas.subscribe((ofertas: Oferta[]) => {
      //console.log('ofertas', ofertas)
      this.ofertasPesquisadas = ofertas
    })
    */
  }

  public pesquisa(termoDaPesquisa: string): void {
    //console.log('keyup caractere', termoDaPesquisa)
    this.subjectPesquisa.next(termoDaPesquisa)


    /* this.ofertas = this.ofertasService.pesquisaOfertas(termoDaPesquisa)
   this.ofertas.subscribe(
     (ofertas: Oferta[]) => console.log('ofertas', ofertas),
     (erro: any) => console.log('Erro status: ', erro.status),
     () => console.log('Fluxo de eventos completos')
   )*/
  }

  public limpaPesquisa():void {
    this.subjectPesquisa.next('')
  }

}

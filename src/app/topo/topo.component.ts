import { OfertasService } from './../ofertas.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from '../shared/oferta.model';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]> | undefined
  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
  }

  public pesquisa(termoDaPesquisa: string): void {
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaPesquisa)
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log('ofertas', ofertas),
      (erro: any) => console.log('Erro status: ', erro.status),
      () => console.log('Fluxo de eventos completos')
    )
  }
}

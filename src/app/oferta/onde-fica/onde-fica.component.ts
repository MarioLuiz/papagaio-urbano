import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertasService]
})
export class OndeFicaComponent implements OnInit {

  ondeFica: string = ''

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit(): void {

    this.route.parent?.params.subscribe((parametros: Params) => {
      //let id: any = this.route.parent?.snapshot.params['id']
      this.ofertasService.getOndeFicaOfertaPorId(parametros.id)
        .then((enderecoOferta: string) => {
          this.ondeFica = enderecoOferta
        })
    })

  }

}

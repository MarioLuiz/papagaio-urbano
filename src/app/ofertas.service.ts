import { Oferta } from "./shared/oferta.model"
import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core"

@Injectable()
export class OfertasService {

    urlTrazDestaques: string = 'http://localhost:3000/ofertas?destaque=true'
    urlFiltraCategoria: string = 'http://localhost:3000/ofertas?categoria='
    urlFiltraId: string = 'http://localhost:3000/ofertas?id='

    constructor(private http: HttpClient) { }

    public getOfertas(): Promise<Array<Oferta>> {
        return this.http.get(this.urlTrazDestaques).toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertasPorCategoria(categoria: string): Promise<Array<Oferta>> {
        return this.http.get(`${this.urlFiltraCategoria}${categoria}`).toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${this.urlFiltraId}${id}`).toPromise()
            .then((resposta: any) => {
                return resposta[0]
            })
    }
}
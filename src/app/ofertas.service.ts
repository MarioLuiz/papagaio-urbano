import { URL_API } from './app.api';
import { Oferta } from "./shared/oferta.model"
import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core"

@Injectable()
export class OfertasService {

    //private url_api = 'http://localhost:3000/ofertas'

    constructor(private http: HttpClient) { }

    public getOfertas(): Promise<Array<Oferta>> {
        return this.http.get(`${URL_API}?destaque=true`).toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertasPorCategoria(categoria: string): Promise<Array<Oferta>> {
        return this.http.get(`${URL_API}?categoria=${categoria}`).toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}?id=${id}`).toPromise()
            .then((resposta: any) => {
                return resposta[0]
            })
    }
}
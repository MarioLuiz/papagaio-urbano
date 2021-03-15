import { Oferta } from "./shared/oferta.model"
import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core"

@Injectable()
export class OfertasService {

    url: string = 'http://localhost:3000/ofertas?destaque=true'

    constructor(private http: HttpClient) { }

    public getOfertas(): Promise<Array<Oferta>> {
        return this.http.get(this.url).toPromise()
            .then((resposta: any) => resposta)
    }
}
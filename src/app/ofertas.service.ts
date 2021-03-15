import { Oferta } from "./shared/oferta.model"
import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core"

//import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService {

    url: string = 'http://localhost:3000/ofertas'

    constructor(private http: HttpClient) { }

    public getOfertas(): Promise<Array<Oferta>> {
        return this.http.get(this.url).toPromise()
            .then((resposta: any) => resposta)
    }
}
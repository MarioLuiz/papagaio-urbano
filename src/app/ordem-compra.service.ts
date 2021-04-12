import { Pedido } from "./shared/pedido.model"
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from "@angular/core"
import { Observable } from 'rxjs';
import { URL_API } from './app.api';
import { map } from 'rxjs/operators';
import { retry } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService {

    constructor(private http: HttpClient) { }

    // public efetiverCompra(pedido: Pedido) {
    //     console.log("Pedido recebido: ", pedido)
    // }

    public efetiverCompra(pedido: Pedido): Observable<number> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        let options = {
            headers,
        }

        return this.http.post(`${URL_API}/pedidos`, JSON.stringify(pedido), options).pipe(
            map((resposta: any) => resposta.id),
            retry(3)
        )
    }
}
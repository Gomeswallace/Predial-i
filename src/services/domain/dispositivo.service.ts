import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
//importe alterado de observable para Rx, pq e mais completo
import { Observable } from "rxjs/Rx"
import { DispositivoDTO } from "../../models/dispositivo.dto";


@Injectable()
export class DispositivoService {

    constructor(public http: HttpClient) {
    }

    //Observable pq e uma requisicao assincrona e fica aguardando a resposta
    findAll() : Observable<DispositivoDTO[]>  {
        //a crase permite utilizar variavel sem precisar concatenar com string
        return this.http.get<DispositivoDTO[]>(`${API_CONFIG.baseUrl}/dispositivoss`);
    }
}
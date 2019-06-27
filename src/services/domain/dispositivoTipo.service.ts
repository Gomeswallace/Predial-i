import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
//importe alterado de observable para Rx, pq e mais completo
import { Observable } from "rxjs/Rx"
import { DispositivoTipoDTO } from "../../models/dispositivoTipo.dto";

@Injectable()
export class DispositivoTipoService {

    constructor(public http: HttpClient) {
    }

    //Observable pq e uma requisicao assincrona e fica aguardando a resposta
    findAll() : Observable<DispositivoTipoDTO[]>  {
        //a crase permite utilizar variavel sem precisar concatenar com string
        return this.http.get<DispositivoTipoDTO[]>(`${API_CONFIG.baseUrl}/tiposdispositivos`);
    }

    find(id: string) : Observable<DispositivoTipoDTO>  {
        //a crase permite utilizar variavel sem precisar concatenar com string
        return this.http.get<DispositivoTipoDTO>(`${API_CONFIG.baseUrl}/tiposdispositivos/${id}`);
    }
}
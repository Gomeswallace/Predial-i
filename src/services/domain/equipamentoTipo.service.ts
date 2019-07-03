import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
//importe alterado de observable para Rx, pq e mais completo
import { Observable } from "rxjs/Rx"
import { EquipamentoTipoDTO } from "../../models/equipamentoTipo.dto";

@Injectable()
export class EquipamentoTipoService {

    constructor(public http: HttpClient) {
    }

    //Observable pq e uma requisicao assincrona e fica aguardando a resposta
    findAll() : Observable<EquipamentoTipoDTO[]>  {
        //a crase permite utilizar variavel sem precisar concatenar com string
        return this.http.get<EquipamentoTipoDTO[]>(`${API_CONFIG.baseUrl}/tiposequipamentos`);
    }

    find(id: string) : Observable<EquipamentoTipoDTO>  {
        //a crase permite utilizar variavel sem precisar concatenar com string
        return this.http.get<EquipamentoTipoDTO>(`${API_CONFIG.baseUrl}/tiposequipamentos/${id}`);
    }
}
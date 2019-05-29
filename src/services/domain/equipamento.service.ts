import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { EquipamentoDTO } from "../../models/equipamento.dto";

@Injectable()
export class EquipamentoService {

    constructor(public http: HttpClient) {
    }

    //Observable pq e uma requisicao assincrona e fica aguardando a resposta
    findAll() : Observable<EquipamentoDTO[]>  {
        //a crase permite utilizar variavel sem precisar concatenar com string
        return this.http.get<EquipamentoDTO[]>(`${API_CONFIG.baseUrl}/equipamentos`);
    }

    findByAmbiente(ambiente_id : string, page : number = 0, linesPerPage : number = 24) {
        return this.http.get(`${API_CONFIG.baseUrl}/equipamentos/page/?ambiente=${ambiente_id}&page=${page}&linesPerPage=${linesPerPage}`);
      }  
}
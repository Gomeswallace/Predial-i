import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { AmbienteDTO } from "../../models/ambiente.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class AmbienteService {

    constructor(public http: HttpClient) {
    }

    //Observable pq e uma requisicao assincrona e fica aguardando a resposta
    findAll() : Observable<AmbienteDTO[]>  {
        //a crase permite utilizar variavel sem precisar concatenar com string
        return this.http.get<AmbienteDTO[]>(`${API_CONFIG.baseUrl}/ambientes`);
    }

    findByDispositivo(dispositivo_id : string, page : number = 0, linesPerPage : number = 24) {
        return this.http.get(`${API_CONFIG.baseUrl}/ambientes/page/?dispositivo=${dispositivo_id}&page=${page}&linesPerPage=${linesPerPage}`);
      }  
}
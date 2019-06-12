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

    findByDispositivo(dispositivo_id : string) : Observable<AmbienteDTO[]> {
        return this.http.get<AmbienteDTO[]>(`${API_CONFIG.baseUrl}/ambientes/page/?dispositivo=${dispositivo_id}`);
    }
    
    insert(ambiente: AmbienteDTO){   
        if(ambiente.id){
            return this.http.put<AmbienteDTO>(`${API_CONFIG.baseUrl}/ambientes/${ambiente.id}`, ambiente);
        }else{
            return this.http.post(`${API_CONFIG.baseUrl}/ambientes/`, ambiente);
        }
    }

    delete(id: string){
        return this.http.delete<AmbienteDTO>(`${API_CONFIG.baseUrl}/ambientes/${id}`);
    }
}
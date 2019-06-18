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

    findByAmbiente(ambiente_id : string) : Observable<EquipamentoDTO[]>{
        return this.http.get<EquipamentoDTO[]>(`${API_CONFIG.baseUrl}/equipamentos/page/?ambiente=${ambiente_id}`);
      }
      
    insert(equipamento: EquipamentoDTO){   
        if(equipamento.id){
            return this.http.put<EquipamentoDTO>(`${API_CONFIG.baseUrl}/equipamentos/${equipamento.id}`, equipamento);
        }else{
            return this.http.post(`${API_CONFIG.baseUrl}/equipamentos/`, equipamento);
        }
    }

    delete(id: string){
        return this.http.delete<EquipamentoDTO>(`${API_CONFIG.baseUrl}/equipamentos/${id}`);
    }  
}
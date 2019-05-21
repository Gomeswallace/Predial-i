import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { UsuarioDTO } from "../../models/usuario.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class UsuarioService{

    constructor(
        public http: HttpClient, 
        public storage: StorageService) {
    }

    findByEmail(email : string) : Observable<UsuarioDTO>{
/*
    //retirado o token e o authHeader pois foi criado o interceptor para inserir o header em todas as requisicoes
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
*/
        //enviar o cabecalho para a requisicao
        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`); 
    }
}
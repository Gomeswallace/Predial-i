import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService{

    jwtHelper : JwtHelper = new JwtHelper();

    constructor(
        public http : HttpClient,
        public storage : StorageService){

    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            //objeto que especifica os dados da requisicao
            {
                //para pegar o header da resposta, que fica dentro do response
                observe : 'response',
                //login retorna a resposta vazia e precisa ser texto para nao fazer o parse de Json 
                responseType : 'text'
            } );
    }

    refreshToken(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            //objeto que especifica os dados da requisicao
            {
                //para pegar o header da resposta, que fica dentro do response
                observe : 'response',
                //retorna a resposta vazia e precisa ser texto para nao fazer o parse de Json 
                responseType : 'text'
            } );
    }

    successfulLogin(authorizationValue : string){
        //retirar o barrer do header
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token : tok,
            email : this.jwtHelper.decodeToken(tok).sub           
            //.sub funcao do Jwthelper para extrair o email do token
        };

        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }

}
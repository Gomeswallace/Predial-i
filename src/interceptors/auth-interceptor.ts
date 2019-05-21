import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("PASSOU NO AUTH...")

        let localUser = this.storage.getLocalUser();

        //garantir que a requisicao e para o nosso WebService e add o Authorization na requisicao
        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

        if(localUser && requestToAPI){
            //necessidade do angular para clonar a requisicao original
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        } else{
            return next.handle(req);
        }
    } 
}

//declaracao do provider do interceptor
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};

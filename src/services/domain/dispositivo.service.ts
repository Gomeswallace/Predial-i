import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx"
import { DispositivoDTO } from "../../models/dispositivo.dto";


@Injectable()
export class DispositivoService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<DispositivoDTO[]>  {
        return this.http.get<DispositivoDTO[]>(`${API_CONFIG.baseUrl}/dispositivos`);
    }
}
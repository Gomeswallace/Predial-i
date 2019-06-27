import { DispositivoTipoDTO } from "./dispositivoTipo.dto";

export interface DispositivoDTO{
  id: string;
  nome: string;
  descricao: string;
  dispositivoTipo: DispositivoTipoDTO;
}

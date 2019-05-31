import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DispositivoInserirPage } from './dispositivo-inserir';
import { DispositivoTipoService } from '../../services/domain/dispositivoTipo.service';
import { DispositivoService } from '../../services/domain/dispositivo.service';

@NgModule({
  declarations: [
    DispositivoInserirPage,
  ],
  imports: [
    IonicPageModule.forChild(DispositivoInserirPage),
  ],
  providers:[
    DispositivoTipoService,
    DispositivoService
  ],
})
export class DispositivoInserirPageModule {}

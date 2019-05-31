import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DispositivosPage } from './dispositivos';
import { DispositivoTipoService } from '../../services/domain/dispositivoTipo.service';

@NgModule({
  declarations: [
    DispositivosPage,
  ],
  imports: [
    IonicPageModule.forChild(DispositivosPage),
  ],
})
export class DispositivosPageModule {}

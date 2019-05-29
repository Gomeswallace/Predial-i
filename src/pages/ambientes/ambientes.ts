import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AmbienteService } from '../../services/domain/ambiente.service';
import { AmbienteDTO } from '../../models/ambiente.dto';

@IonicPage()
@Component({
  selector: 'page-ambientes',
  templateUrl: 'ambientes.html',
})

export class AmbientesPage {

  ambientes: AmbienteDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ambienteService: AmbienteService) {
  }

  ionViewDidLoad() {
    let dispositivo_id = this.navParams.get('disp_id');
    this.ambienteService.findByDispositivo(dispositivo_id)
            .subscribe(response => {          
              this.ambientes = response['content'];
            },
            error => {});
  }

  showEquipamentos(equipamento_id: string){
    this.navCtrl.push('EquipamentosPage', {equip_id: equipamento_id});
  }

  adicionar(dispositivo_id: string){
    this.navCtrl.push('AdicionarAmbientePage', {disp_id: dispositivo_id});
  }
}


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipamentoDTO } from '../../models/equipamento.dto';
import { EquipamentoService } from '../../services/domain/equipamento.service';

@IonicPage()
@Component({
  selector: 'page-equipamentos',
  templateUrl: 'equipamentos.html',
})
export class EquipamentosPage {

  itens : EquipamentoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public equipamentoService: EquipamentoService) {
  }

  ionViewDidLoad() {
    let equipamento_id = this.navParams.get('equip_id');
    this.equipamentoService.findByAmbiente(equipamento_id)
            .subscribe(response => {
              this.itens = response['content'];
            },
            error => {});
  }

}

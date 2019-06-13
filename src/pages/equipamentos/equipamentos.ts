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

  equipamentos : EquipamentoDTO[]; 
  ambiente_id = this.navParams.get('ambie_id'); 
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public equipamentoService: EquipamentoService) {       
  }

  ionViewDidLoad() {
    
    this.equipamentoService.findByAmbiente(this.ambiente_id)
            .subscribe(response => {
              this.equipamentos = response;
            },
            error => {});
  }

  adicionar(ambiente_id: string){
    this.navCtrl.push('EquipamentoInserirPage', {amb_id: ambiente_id});
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EquipamentoDTO } from '../../models/equipamento.dto';
import { EquipamentoService } from '../../services/domain/equipamento.service';
import { AmbienteDTO } from '../../models/ambiente.dto';

@IonicPage()
@Component({
  selector: 'page-equipamentos',
  templateUrl: 'equipamentos.html',
})
export class EquipamentosPage {

  equipamentos : EquipamentoDTO[]; 
  ambiente: AmbienteDTO;
  //ambiente: this.navParams.get(ambiente_param); 
  //ambiente_nome = this.navParams.get('ambie_nome'); 
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public equipamentoService: EquipamentoService,
    public toast: ToastController) {
      this.ambiente = this.navParams.data.ambiente_param;
  }

  ionViewDidLoad() { 
    this.equipamentoService.findByAmbiente(this.ambiente.id)
        .subscribe(response => {
          this.equipamentos = response;
        },
        error => {});
  }

  addEquipamento(){    
    this.navCtrl.push('EquipamentoInserirPage', {ambie_param: this.ambiente});
  }

  editEquipamento(equip : EquipamentoDTO){
    this.navCtrl.push('EquipamentoInserirPage', {equipamento : equip, ambie_param : this.ambiente});
  }

  removeEquipamento(id : string){
    this.equipamentoService.delete(id)
    .subscribe(response => {
      this.toast.create({ message : 'Ambiente removido com sucesso!', duration: 3000 }).present();
      this.navCtrl.setRoot('AmbientesPage');},
      error => {(e) => {
        this.toast.create({ message : 'Erro ao salvar Ambiente', duration: 3000 }).present();
        console.error(e);
      }});
  }
}
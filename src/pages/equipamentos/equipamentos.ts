import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    public equipamentoService: EquipamentoService,
    public toast: ToastController) {
  }

  ionViewDidLoad() {    
    this.equipamentoService.findByAmbiente(this.ambiente_id)
        .subscribe(response => {
          this.equipamentos = response;
        },
        error => {});
  }

  addEquipamento(){
    this.navCtrl.push('EquipamentoInserirPage', {amb_id: this.ambiente_id});
  }

  editEquipamento(equip : EquipamentoDTO ){
    this.navCtrl.push('EquipamentoInserirPage', {equipamento : equip, amb_id: this.ambiente_id});
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    public ambienteService: AmbienteService,
    public toast: ToastController) {
  }

  ionViewDidLoad() {
    let dispositivo_id = this.navParams.get('disp_id');
    this.ambienteService.findByDispositivo(dispositivo_id)
            .subscribe(response => {          
              this.ambientes = response;
            },
            error => {});
  }

  showEquipamentos(ambiente_id: string){
    this.navCtrl.push('EquipamentosPage', {ambie_id: ambiente_id});
  }

  addAmbiente(dispositivo_id: string){
    this.navCtrl.push('AmbienteInserirPage', {disp_id: dispositivo_id});
  }

  editAmbiente(ambie : AmbienteDTO ){
    this.navCtrl.push('AmbienteInserirPage', {ambiente : ambie});
  }
  
  removeAmbiente(id : string){
    this.ambienteService.delete(id)
    .subscribe(response => {
      this.toast.create({ message : 'Ambiente removido com sucesso!', duration: 3000 }).present();
      this.navCtrl.setRoot('AmbientesPage');},
      error => {(e) => {
        this.toast.create({ message : 'Erro ao salvar Ambiente', duration: 3000 }).present();
        console.error(e);
      }});
  }  
}


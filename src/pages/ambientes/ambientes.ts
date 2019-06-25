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
  dispositivo_id = this.navParams.get('dispositivo_id');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ambienteService: AmbienteService,
    public toast: ToastController) {
  }

  ionViewDidLoad() {
    this.ambienteService.findByDispositivo(this.dispositivo_id)
            .subscribe(response => {          
              this.ambientes = response;
            },
            error => {});
  }

  showEquipamentos(ambiente_id: string){
    this.navCtrl.push('EquipamentosPage', {ambie_id: ambiente_id});
  }

  addAmbiente(){
    this.navCtrl.push('AmbienteInserirPage', {disp_id: this.dispositivo_id});
  }

  editAmbiente(ambie : AmbienteDTO ){
    this.navCtrl.push('AmbienteInserirPage', {ambiente : ambie, disp_id: this.dispositivo_id});
  }
  
  removeAmbiente(ambiente_id : string){
    this.ambienteService.delete(ambiente_id)
    .subscribe(response => {
      this.toast.create({ message : 'Ambiente removido com sucesso!', duration: 4000 }).present();
      this.navCtrl.setRoot('DispositivosPage');},
      error => {(e) => {
        this.toast.create({ message : 'Erro ao salvar Ambiente', duration: 4000 }).present();
        console.error(e);
      }});
  }  
}


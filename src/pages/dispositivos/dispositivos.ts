import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DispositivoService } from '../../services/domain/dispositivo.service';
import { DispositivoDTO } from '../../models/dispositivo.dto';

@IonicPage()
@Component({
  selector: 'page-dispositivos',
  templateUrl: 'dispositivos.html',
})
export class DispositivosPage {

  dispositivos: DispositivoDTO[];

  constructor(    
      public navCtrl: NavController, 
      public navParams: NavParams,
      public dispositivoService: DispositivoService,
      public alertCtrl: AlertController,
      public toast: ToastController) {
    }

  ionViewDidLoad() {
    this.dispositivoService.findAll()
      .subscribe(response => { //funcao anonima callback sera executada qdo a resposta chegar
        this.dispositivos = response;
      },
      error => {});
  }

  showAmbientes(disp_id: string, disp_nome: string){
    this.navCtrl.push('AmbientesPage', {dispositivo_id: disp_id, dispositivo_nome: disp_nome});
  }

  addDispositivo(){
    this.navCtrl.push('DispositivoInserirPage');
  }

  editDispositivo(disp : DispositivoDTO ){
    this.navCtrl.push('DispositivoInserirPage', {dispositivo : disp});
  }
  
  removeDispositivo(id : string){
    this.dispositivoService.delete(id)
    .subscribe(response => {
      this.showDeleteOk();
      //this.toast.create({ message : 'Dispositivo removido com sucesso!', duration: 3000 }).present();
      //this.navCtrl.setRoot('DispositivosPage');
    },
      error => {(e) => {
        this.toast.create({ message : 'Erro ao salvar Dispositivo', duration: 3000 }).present();
        console.error(e);
      }});
  }

  showDeleteOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Dispositivo removido.',
      enableBackdropDismiss: false,
      buttons:[
        {
          text: 'OK',
          handler : () => { this.navCtrl.setRoot('DispositivosPage'); }
        }]
      });
      alert.present();
    }
}
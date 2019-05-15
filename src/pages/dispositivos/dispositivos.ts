import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DispositivoService } from '../../services/domain/dispositivo.service';


/**
 * Generated class for the DispositivosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dispositivos',
  templateUrl: 'dispositivos.html',
})
export class DispositivosPage {

  constructor(    
      public navCtrl: NavController, 
      public navParams: NavParams,
      public dispositivoService: DispositivoService) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DispositivosPage');
    this.dispositivoService.findAll()
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ambiente-inserir',
  templateUrl: 'ambiente-inserir.html',
})
export class AmbienteInserirPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AmbienteInserirPage');
  }

}

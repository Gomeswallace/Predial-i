import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

//ionicPage informa que a e uma pagina e pode ser referenciada o nome como String
@IonicPage()
//component faz este arquivo ser um controlador
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
//declaracao de uma classe
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}

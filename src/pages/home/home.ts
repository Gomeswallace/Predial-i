import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController }  from 'ionic-angular/components/app/menu-controller';

//ionicPage informa que a e uma pagina e pode ser referenciada o nome como String
@IonicPage()
//component faz este arquivo ser um controlador
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
//declaracao de uma classe
export class HomePage {
//MenuController injetar a dependencia para desabilitar o menu da tela inicial
//ver em ionic lyfecycle events
  constructor(public navCtrl: NavController, public menu: MenuController) {
  }

  ionViewWillEnter(){
  this.menu.swipeEnable(false);
  }
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  login(){
    this.navCtrl.setRoot("DispositivosPage");
  }

}

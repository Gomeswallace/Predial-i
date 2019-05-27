import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AmbienteService } from '../../services/domain/ambiente.service';

@IonicPage()
@Component({
  selector: 'page-ambientes',
  templateUrl: 'ambientes.html',
})

export class AmbientesPage {

  itens : any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ambienteService: AmbienteService) {
  }

  ionViewDidLoad() {

    let dispositivo_id = this.navParams.get('disp_id');
    this.ambienteService.findByDispositivo(dispositivo_id)
            .subscribe(response => {
              this.itens = response['content'];
            },
            error => {});

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ambientes',
  templateUrl: 'ambientes.html',
})

export class AmbientesPage {

  itens : any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.itens = [
      {
        nome: "1",
        descricao: "TESTE",
        equipamentoNome: "Nome",
        equipameentoPorta: 2,
        equipamentoStatus: true,
        EquipamentoTipo: "Tipo Equipamento",
        dispositivoId: 1
      },
      {

      }
    ]
  };

}

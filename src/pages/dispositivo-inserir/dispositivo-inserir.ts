import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DispositivoService } from '../../services/domain/dispositivo.service';
import { DispositivoDTO } from '../../models/dispositivo.dto';
import { DispositivoTipoDTO } from '../../models/dispositivoTipo.dto';
import { DispositivoTipoService } from '../../services/domain/dispositivoTipo.service';

/**
 * Generated class for the DispositivoInserirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dispositivo-inserir',
  templateUrl: 'dispositivo-inserir.html',
})
export class DispositivoInserirPage {

  formGroup: FormGroup;
  dispositivo: DispositivoDTO;
  tipos: DispositivoTipoDTO[];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public dispositivoTipoService: DispositivoTipoService,
      public dispositivoService: DispositivoService) {

        this.formGroup = this.formBuilder.group({
          dispositivoTiposId : [null, [Validators.required]]
        });
      }

  ionViewDidLoad() {
    this.dispositivoTipoService.findAll()
    .subscribe(response => {
      this.tipos = response;
      this.formGroup.controls.dispositivoTiposId.setValue(this.tipos[0].id);
    },
    error => {});
}  

  Cadastrar(){
    //this.dispositivoService.inserir();
  }

}

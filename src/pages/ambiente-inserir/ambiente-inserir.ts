import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmbienteDTO } from '../../models/ambiente.dto';
import { AmbienteService } from '../../services/domain/ambiente.service';

@IonicPage()
@Component({
  selector: 'page-ambiente-inserir',
  templateUrl: 'ambiente-inserir.html',
})
export class AmbienteInserirPage {

  title: string;
  formGroup: FormGroup;
  ambiente: AmbienteDTO;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public ambienteService: AmbienteService,
      public alertCtrl: AlertController,
      public toast: ToastController) {
        this.formGroup = this.formBuilder.group({});

        this.ambiente = this.navParams.data.ambiente || {};
        this.setupPageTitle();
        this.createFrom();
      }

ionViewDidLoad() {
//    this.dispositivoTipoService.findAll()
//    .subscribe(response => {
//      this.tipos = response;
//      this.formGroup.controls.idTipo.setValue(this.tipos[0].id);
//    },
//    error => {});
}  

private setupPageTitle(){
  this.title = this.navParams.data.ambiente ? 'Alterando Ambiente' : 'Novo Ambiente';
}

createFrom(){
  this.formGroup = this.formBuilder.group({
    id: [this.ambiente.id],
    nome: [this.ambiente.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
    descricao: [this.ambiente.descricao, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
    dispositivoId: [this.ambiente.dispositivoId, [Validators.required]]
  });
}

onSubmit(){
  if(this.formGroup.valid){
    this.ambienteService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
      //this.toast.create({ message : 'Dispositivo cadastrado com sucesso!', duration: 3000 }).present();
      this.navCtrl.setRoot('AmbientesPage');
    },
    error => {(e) => {
      this.toast.create({ message : 'Erro ao salvar Ambiente', duration: 3000 }).present();
      console.error(e);
    }});
  }
}

showInsertOk(){
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Ambiente cadastrado com sucesso.',
    enableBackdropDismiss: false,
    buttons:[
      {
        text: 'OK'
        //handler : () => { this.navCtrl.setRoot('AmbientesPage'); }
      }
    ]
  });
  alert.present();
}

}

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
  ehAlteracao: boolean;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public ambienteService: AmbienteService,
      public alertCtrl: AlertController,
      public toast: ToastController) {
        this.formGroup = this.formBuilder.group({});
        this.ehAlteracao = this.navParams.data.ambiente ? true : false; 
        this.ambiente = this.navParams.data.ambiente || {};
        this.setupPageTitle();
        this.createFrom();
      }

ionViewDidLoad() {
}  

private setupPageTitle(){  
    this.title = this.ehAlteracao ? 'Alterando Ambiente' : 'Novo Ambiente';
}

createFrom(){
  this.formGroup = this.formBuilder.group({
    id: [this.ambiente.id],
    nome: [this.ambiente.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
    descricao: [this.ambiente.descricao],
    dispositivoId: [this.navParams.data.disp_id]
  });
}

onSubmit(){
  if(this.formGroup.valid){
    this.ambienteService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
    },
    error => {(e) => {
      this.toast.create({ message : 'Erro ao salvar Ambiente', duration: 4000 }).present();
      console.error(e);
    }});
  }
}

showInsertOk(){
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: this.ehAlteracao ? 'Ambiente alterado com sucesso.' : 'Ambiente cadastrado com sucesso.',
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

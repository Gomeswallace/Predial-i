import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DispositivoService } from '../../services/domain/dispositivo.service';
import { DispositivoDTO } from '../../models/dispositivo.dto';
import { DispositivoTipoDTO } from '../../models/dispositivoTipo.dto';
import { DispositivoTipoService } from '../../services/domain/dispositivoTipo.service';

@IonicPage()
@Component({
  selector: 'page-dispositivo-inserir',
  templateUrl: 'dispositivo-inserir.html',
})

export class DispositivoInserirPage {

  title: string;
  formGroup: FormGroup;
  dispositivo: DispositivoDTO;
  tipos: DispositivoTipoDTO[];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public dispositivoTipoService: DispositivoTipoService,
      public dispositivoService: DispositivoService,
      public alertCtrl: AlertController,
      public toast: ToastController) {
        //this.formGroup = this.formBuilder.group({
        //  id : [],
        //  nome : [],
        //  descricao : [],
        //  dispositivoTiposId : [null, [Validators.required]]
        //});

        this.dispositivo = this.navParams.data.dispositivo || {};
        this.setupPageTitle();
        this.createFrom();
      }

ionViewDidLoad() {
    this.dispositivoTipoService.findAll()
    .subscribe(response => {
      this.tipos = response;
      this.formGroup.controls.dispositivoTiposId.setValue(this.tipos[0].id);
    },
    error => {});
}  

private setupPageTitle(){
  this.title = this.navParams.data.dispositivo ? 'Alterando Dispositivo' : 'Novo Dispositivio';
}

createFrom(){
  this.formGroup = this.formBuilder.group({
    id: [this.dispositivo.id],
    nome: [this.dispositivo.nome, Validators.required],
    descricao: [this.dispositivo.descricao, Validators.required],
    dispositivoTiposId: [this.dispositivo.tipo, Validators.required],
  });
}

onSubmit(){
  console.log(this.formGroup.value);
  if(this.formGroup.valid){
    this.dispositivoService.inserir(this.formGroup.value)
    .subscribe(response => {
      //this.showInsertOk();
      this.toast.create({ message : 'Dispositivo cadastrado com sucesso!', duration: 3000 }).present();
      this.navCtrl.pop();
    },
    error => {(e) => {
      this.toast.create({ message : 'Erro ao salvar Dispositivo', duration: 3000 }).present();
      console.error(e);
    }});
  }
}

showInsertOk(){
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Dispositivo cadastrado com sucesso.',
    enableBackdropDismiss: false,
    buttons:[
      {
        text: 'OK',
        handler : () => { this.navCtrl.pop(); }
      }
    ]
  });
  alert.present();
}

}

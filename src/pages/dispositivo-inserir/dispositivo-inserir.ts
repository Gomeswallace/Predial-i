import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  novoDispositivo: boolean = false;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public dispositivoTipoService: DispositivoTipoService,
      public dispositivoService: DispositivoService,
      public alertCtrl: AlertController,
      public toast: ToastController) {
        this.formGroup = this.formBuilder.group({});
        this.novoDispositivo = this.navParams.data.dispositivo ? false : true; 
        this.dispositivo = this.navParams.data.dispositivo || {};
        this.setupPageTitle();
        this.createFrom();
      }

ionViewDidLoad() { 
    this.dispositivoTipoService.findAll()
    .subscribe(response => {
        this.tipos = response;
        this.formGroup.controls.idTipo.setValue(this.tipos[0].id);
        console.log(this.dispositivo);
    },    
    error => {});
}  

private setupPageTitle(){
  this.title = this.novoDispositivo ? 'Novo Dispositivo' : 'Alterando Dispositivo';
}

createFrom(){
  this.formGroup = this.formBuilder.group({
    id: [this.dispositivo.id],
    nome: [this.dispositivo.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    descricao: [this.dispositivo.descricao],
    ip: [this.dispositivo.ip, [Validators.required, Validators.minLength(11), Validators.maxLength(15)]],
    idTipo: [this.dispositivo.dispositivoTipo, [Validators.required]]
  });
}

onSubmit(){
  if(this.formGroup.valid){
    this.dispositivoService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
      //this.toast.create({ message : 'Dispositivo cadastrado com sucesso!', duration: 3000 }).present();
      //this.navCtrl.setRoot('DispositivosPage');
    },
    error => {(e) => {
      this.toast.create({ message : 'Erro ao salvar Dispositivo', duration: 4000 }).present();
      console.error(e);
    }});
  }
}

showInsertOk(){
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: this.novoDispositivo ? 'Dispositivo cadastrado com sucesso.' : 'Dispositivo alterado.',
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

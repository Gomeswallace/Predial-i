import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipamentoService } from '../../services/domain/equipamento.service';
import { EquipamentoDTO } from '../../models/equipamento.dto';
import { EquipamentoTipoService } from '../../services/domain/equipamentoTipo.service';
import { EquipamentoTipoDTO } from '../../models/equipamentoTipo.dto';

@IonicPage()
@Component({
  selector: 'page-equipamento-inserir',
  templateUrl: 'equipamento-inserir.html',
})
export class EquipamentoInserirPage {

  title: string;
  formGroup: FormGroup;
  equipamento: EquipamentoDTO;
  tipos: EquipamentoTipoDTO[];
  tipoEquipamento:  EquipamentoTipoDTO;
  novoEquipamento: boolean = false;
  status: boolean;

  constructor(
      public navCtrl: NavController,               
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public equipamentoTipoService: EquipamentoTipoService,
      public equipamentoService: EquipamentoService,
      public alertCtrl: AlertController,
      public toast: ToastController) {
        this.formGroup = this.formBuilder.group({});
        this.novoEquipamento = this.navParams.data.equipamento ? false : true;  
        this.equipamento = this.navParams.data.equipamento || {};        
        this.setupPageTitle();
        this.createFrom();
  }

  ionViewDidLoad() {
    this.equipamentoTipoService.findAll()
      .subscribe(response => {
        this.tipos = response;
        this.formGroup.controls.tipo.setValue(this.tipos[0].id);
      },
      error => {});
  }

  private setupPageTitle(){
    this.title = this.novoEquipamento ? 'Novo Equipamento' : 'Alterando Equipamento';
  }
  
  createFrom(){    
    this.formGroup = this.formBuilder.group({
      id: [this.equipamento.id],
      nome: [this.equipamento.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      porta: [this.equipamento.porta, [Validators.required]],      
      status: [this.equipamento.status], 
      tipo: [this.equipamento.tipo, [Validators.required]],
      ambienteId: [this.navParams.data.amb_id]
    });     
  }

  //updateStatus(){  
  //  this.status = this.equipamento.status == "false" ? false : true;      }

  onSubmit(){
    if(this.formGroup.valid){
      this.equipamentoService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();      
      },
      error => {(e) => {
        this.toast.create({ message : 'Erro ao salvar Equipamento', duration: 3000 }).present();
        console.error(e);
      }});
    }
  }
  
  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: this.novoEquipamento ? 'Equipamento cadastrado com sucesso.' : 'Equipamento alterado.',
      enableBackdropDismiss: false,
      buttons:[
        {
          text: 'OK',
          handler : () => { this.navCtrl.setRoot('DispositivosPage'); }
        }
      ]
    });
    alert.present();
  }
}
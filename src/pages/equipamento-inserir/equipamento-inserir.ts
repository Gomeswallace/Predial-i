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

  ambiente_id = this.navParams.data.amb_id;
  title: string;
  formGroup: FormGroup;
  equipamento: EquipamentoDTO;
  portas: Array<any> = new Array; 
  porta: string;
  tipos: EquipamentoTipoDTO[];
  //tipoEquipamento:  EquipamentoTipoDTO;
  novoEquipamento: boolean = false;
  status: boolean;
  porta_equip: string;
  id_tipo: string;

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
        //this.id_tipo = this.navParams.data.equipamento.tipo || {};
        this.setupPageTitle();
        this.createFrom();
  }

  ionViewDidLoad() {
    this.findTipoEquipamento();
    this.findPortas();
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
      ambienteId: [this.ambiente_id]
    });     
  }

  findTipoEquipamento(){
    this.equipamentoTipoService.findAll()
      .subscribe(response => {
        this.tipos = response;
        if(this.novoEquipamento){
          this.formGroup.controls.tipo.setValue(this.tipos[0].id);
        }else{
          this.formGroup.controls.tipo.setValue(this.equipamento.tipo.id.toString());
        }
        
      },
      error => {});
  }

  findPortas(){
    this.porta_equip = this.equipamento.porta == null ? Number(0).toString() : this.equipamento.porta;
    this.equipamentoService.findPortas(this.ambiente_id, this.porta_equip)
      .subscribe(response => {
        this.portas = response;
        if(this.novoEquipamento){
          this.formGroup.controls.porta.setValue(this.portas[0]);          
        }else{        
          this.formGroup.controls.porta.setValue(this.equipamento.porta.toString());
        }        
      },
      error => {});  
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
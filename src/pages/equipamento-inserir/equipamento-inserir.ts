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

  constructor(
      public navCtrl: NavController,               
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public equipamentoTipoService: EquipamentoTipoService,
      public equipamentoService: EquipamentoService,
      public alertCtrl: AlertController,
      public toast: ToastController) {
    
        this.formGroup = this.formBuilder.group({});

        this.equipamento = this.navParams.data.equipamento || {};
        this.setupPageTitle();
        this.createFrom();
  }

  ionViewDidLoad() {
    this.equipamentoTipoService.findAll()
    .subscribe(response => {
      this.tipos = response;
      this.formGroup.controls.idTipo.setValue(this.tipos[0].id);
    },
    error => {});
}

  private setupPageTitle(){
    this.title = this.navParams.data.dispositivo ? 'Alterando Equipamento' : 'Novo Equipamento';
  }
  
  createFrom(){
    this.formGroup = this.formBuilder.group({
      id: [this.equipamento.id],
      nome: [this.equipamento.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      //descricao: [this.equipamento.descricao, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      idTipo: [this.equipamento.idTipo, [Validators.required]],
      porta: [this.equipamento.porta, [Validators.required]],
      status: [this.equipamento.status, [Validators.required]],
      ambienteId: [this.equipamento.ambienteId, [Validators.required]]
    });
  }
}
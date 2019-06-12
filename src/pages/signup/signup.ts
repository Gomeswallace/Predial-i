import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/domain/usuario.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  title: string;
  formGroup: FormGroup;
  
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public usuarioService: UsuarioService,
      public alertCtrl: AlertController) {

        this.setupPageTitle();

        this.formGroup = this.formBuilder.group({
          nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
          email: ['joaquim@gmail.com', [Validators.required, Validators.email]],          
          senha : ['321', [Validators.required]],
          tipo : ['2']     
        });
  }

  private setupPageTitle(){
    this.title = 'Cadastro';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(){
    this.usuarioService.insert(this.formGroup.value)
            .subscribe(response => {
              this.showInsertOk();
            },
            error => {});
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro realizado com sucesso.',
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

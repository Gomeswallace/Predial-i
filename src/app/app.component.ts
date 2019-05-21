import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

//Controlodor da pagina app.html
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage indica qual a pagina inicial
  //alterado o tipo para string devido a criacao do modulo para home e utilizaado
  //o IonicPage no controlador
  rootPage: string = 'HomePage';

 //array com os componentes do menu
  pages: Array<{title: string, component: string}>;

  constructor(
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      public auth : AuthService) {
    this.initializeApp();

    //lista de paginas que compoem o menu
    //em component utilizar o nome informado no controlador
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Dispositivos', component: 'DispositivosPage' },
      { title: 'Sair', component: '' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page : {title: string, component: string}) {
    
    switch(page.title){
      case 'Sair':
       this.auth.logout();
       this.nav.setRoot('HomePage');
       break;

      default :
      this.nav.setRoot(page.component);
      break;
    }

    
  }
}

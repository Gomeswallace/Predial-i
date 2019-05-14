import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//anotacao do DECORATOR que contem configuracao para alterar a classe
@NgModule({
  declarations: [
    MyApp //myapp esta no app.Component
    //retirado o homePage pq foi criado um modulo para a pagina e sera
    //carregada no momento do click
    //HomePage //homepage esta em pages
  ],
  //import de modulos que sao utilizados neste modulo
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  //bootstrap informa como o app vai iniciar
  bootstrap: [IonicApp],
  //qdo for pagina declarada no declarations devem ser repetidas aqui, caso seja component nao precisa
  entryComponents: [
    MyApp
    //HomePage
  ],
  //declacao de classes que sejam uma estancia unica para esse modulo
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {} //uma classe sem corpo nenhum e export para ser utilizado em outra classe

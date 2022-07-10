import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CryptoServiceService } from './services/crypto-service.service'
import { FormsModule } from '@angular/forms';
import { CurrencyItemComponent } from './components/currency-item/currency-item.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { CurrencyItemInfoComponent } from './components/currency-item-info/currency-item-info.component';
import { NgChartsModule } from 'ng2-charts';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WalletComponent } from './components/wallet/wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyItemComponent,
    CurrencyListComponent,
    CurrencyItemInfoComponent,
    LoginComponent,
    RegisterComponent,
    WalletComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [CryptoServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

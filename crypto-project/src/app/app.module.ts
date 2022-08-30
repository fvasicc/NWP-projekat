import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CryptoServiceService } from './services/crypto-service.service'
import { FormsModule } from '@angular/forms';
import { CurrencyItemComponent } from './components/currency-item/currency-item.component';
import { CurrencyListComponent } from './pages/currency-list/currency-list.component';
import { CurrencyItemInfoComponent } from './components/currency-item-info/currency-item-info.component';
import { NgChartsModule } from 'ng2-charts';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { AuthGuard } from './guards/auth-guard';
import { TokenInterceptor } from './services/interceptor/token-interceptor';
import { CurrencyTransactionComponent } from './components/currency-transaction/currency-transaction.component';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { ChangePassFormComponent } from './components/change-pass-form/change-pass-form.component';
import { LoggedGuard } from './guards/logged-user-guard';
import { CryptoCardComponent } from './components/crypto-card/crypto-card.component';
import { CarouselModule, ModalModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { PasswordCheckerComponent } from './components/password-checker/password-checker.component';
import { DepositPaymentComponent } from './components/deposit-payment/deposit-payment.component';
import { InputCardDataComponent } from './components/input-card-data/input-card-data.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import {MatSliderModule} from '@angular/material/slider';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyItemComponent,
    CurrencyListComponent,
    CurrencyItemInfoComponent,
    LoginComponent,
    RegisterComponent,
    WalletComponent,
    CurrencyTransactionComponent,
    AccountInfoComponent,
    ChangePassFormComponent,
    CryptoCardComponent,
    PasswordCheckerComponent,
    DepositPaymentComponent,
    InputCardDataComponent,
    WithdrawalComponent,
    ErrorPageComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    ModalModule,
    MatSliderModule
  ],
  providers: [CryptoServiceService, AuthGuard, LoggedGuard, {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

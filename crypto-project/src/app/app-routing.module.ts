import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { AuthGuard } from './guards/auth-guard';
import { LoggedGuard } from './guards/logged-user-guard';

const routes: Routes = [ 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'currencies', component: CurrencyListComponent },
  { path: 'account', component: AccountInfoComponent, canActivate:[AuthGuard]},
  { path: 'wallet', component: WalletComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate:[LoggedGuard] },
  { path: 'sign-up', component: RegisterComponent, canActivate:[LoggedGuard] },
  { path: '**', component: CurrencyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

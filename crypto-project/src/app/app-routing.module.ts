import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { CurrencyListComponent } from './pages/currency-list/currency-list.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { AuthGuard } from './guards/auth-guard';
import { LoggedGuard } from './guards/logged-user-guard';

const routes: Routes = [
  { path: '', redirectTo: 'currencies', pathMatch: 'full' },
  { path: 'currencies', component: CurrencyListComponent },
  { path: 'account', component: AccountInfoComponent, canActivate: [AuthGuard] },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  { path: 'sign-up', component: RegisterComponent, canActivate: [LoggedGuard] },
  {
    path: 'unauthorized', component: ErrorPageComponent,
    data: {
      error: '401 - UNAUTHORIZED',
      msg: 'You don\'t have permission to access. Please log in.',
      route: 'login',
      buttonText: 'GO TO LOGIN PAGE'
    }
  },
  {
    path: '**', component: ErrorPageComponent,
    data: {
      error: '404 - PAGE NOT FOUND',
      msg: 'The page you are looking for might have been removed \nhad its name changed or is temporary unavailable.',
      route: 'currencies',
      buttonText: 'GO TO HOME PAGE'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

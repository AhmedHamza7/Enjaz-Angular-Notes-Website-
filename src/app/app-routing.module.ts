import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LogOutGuard } from './log-out.guard';
import { LogGuard } from './log.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home',canActivate:[LogGuard], component:HomeComponent},
  {path:'about',canActivate:[LogGuard], component:AboutComponent},
  {path:'login',canActivate:[LogOutGuard], component:LoginComponent},
  {path:'register',canActivate:[LogOutGuard], component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

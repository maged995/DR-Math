import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { LogoutComponent } from './users/logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { TestComponent } from './test/test.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';


const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path:'test',
    component:TestComponent
  },
  {
    path: 'users/register',
    component: RegisterComponent,
    canActivate:[AuthGuard] 
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        component:LoginComponent ,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
 
      {
        path: 'logout',
        component: LogoutComponent,
   
       
      },
      {
        path:'changePassword',
        component:ChangePasswordComponent
      }

    ],
  }, 

  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

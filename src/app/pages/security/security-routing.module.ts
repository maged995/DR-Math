import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { UsersRolesListComponent } from './users-roles/users-roles-list/users-roles-list.component';
import { UsersRolesComponent } from './users-roles/users-roles.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { AuthGuard } from '../../auth/auth.guard';




const routes: Routes = [{
  path: '',
  component: SecurityComponent,
  canActivate:[AuthGuard],
  children: [
    {
      path:'roles',
      component:RolesListComponent,
      canActivate:[AuthGuard],
     },
    {
      path:'userRolesList',
      component:UsersRolesComponent,
      canActivate:[AuthGuard],
    }

  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule { }

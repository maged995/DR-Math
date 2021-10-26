import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ChartsModule } from 'ng2-charts';

import{NgxPrintModule}from'ngx-print';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { UsersRolesListComponent } from './users-roles/users-roles-list/users-roles-list.component';
import { UsersRolesComponent } from './users-roles/users-roles.component';
import { UsersRolesFormComponent } from './users-roles/users-roles-form/users-roles-form.component';
import { RolesComponent } from './roles/roles.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { RolesFormComponent } from './roles/roles-form/roles-form.component';
import { RolesClaimsComponent } from './roles/roles-claims/roles-claims.component';


@NgModule({
  declarations: [SecurityComponent,UsersRolesListComponent,UsersRolesComponent,
    UsersRolesFormComponent,
    RolesComponent,
    RolesListComponent,
    RolesFormComponent,
    RolesClaimsComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
   ChartsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxPrintModule
  ],
  entryComponents:[
UsersRolesFormComponent,RolesFormComponent,RolesClaimsComponent
  
  ]
})
export class SecurityModule { }

import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../material/material.module';
import{FormsModule,ReactiveFormsModule}from'@angular/forms';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';


import { ChartsModule } from 'ng2-charts';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AgmCoreModule } from '@agm/core';








@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,

    NbMenuModule,

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgSelectModule,
    NgxPrintModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAzzd8__4jGhbCM_csy-I2-pt82_jP9uRg'
    }),
    
  ],
  declarations: [
    PagesComponent,
    ForbiddenComponent,
   
    
   
  ],
  entryComponents:[]
})
export class PagesModule {
}

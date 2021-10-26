import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDataComponent } from './basic-data.component';
import { BasicDataRoutingModule } from './basic-data-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsModule } from 'ng2-charts';

import{NgxPrintModule}from'ngx-print';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { StagesListComponent } from './stages/stages-list/stages-list.component';
import { StagesFormComponent } from './stages/stages-form/stages-form.component';
import { LevelsFormComponent } from './stages/levels-form/levels-form.component';
import { LevelsListComponent } from './stages/levels-list/levels-list.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import { TrainersFormComponent } from './trainers/trainers-form/trainers-form.component';
import { TrainersListComponent } from './trainers/trainers-list/trainers-list.component';
import { OrdersFormComponent } from './orders/orders-form/orders-form.component';
import { OrdersDetailsComponent } from './orders/orders-details/orders-details.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrdersSubscriberComponent } from './orders/orders-subscriber/orders-subscriber.component';
import { SubscriberListComponent } from './Subscriber/subscriber-list/subscriber-list.component';
import { SubscriberFormComponent } from './Subscriber/subscriber-form/subscriber-form.component';

import { OrderPaymentListComponent } from './orders/order-payment/order-payment-list/order-payment-list.component';
import { OrderPaymentFormComponent } from './orders/order-payment/order-payment-form/order-payment-form.component';
import { TrainerAccountReportsComponent } from './orders/trainer-account-reports/trainer-account-reports.component';
import { OrderPaymentReportsComponent } from './orders/order-payment/order-payment-reports/order-payment-reports.component';
import { OrderReportsComponent } from './orders/order-reports/order-reports.component';
import { StudentsComponent } from './Subscriber/Students.component';
import { MapsComponent } from './maps/maps.component';
import { ReportsComponent } from './reports/reports.component';
import { SubscriberDegreeComponent } from './Subscriber/subscriber-degree/subscriber-degree.component';
import { SubscriberFinishedComponent } from './Subscriber/subscriber-finished/subscriber-finished.component';
import { SubscriberCertificateComponent } from './Subscriber/subscriber-certificate/subscriber-certificate.component';
import { SubscriberCertificateEnglishComponent } from './Subscriber/subscriber-certificate-english/subscriber-certificate-english.component';
import { MapsFormComponent } from './maps/maps-form/maps-form.component';
import { SubscriberCardsComponent } from './Subscriber/subscriber-cards/subscriber-cards.component';
import { SubscriberAddComponent } from './Subscriber/subscriber-add/subscriber-add.component';
import { OrderTrainersReportsComponent } from './orders/order-trainers-reports/order-trainers-reports.component';






@NgModule({
  declarations: [BasicDataComponent, StagesListComponent, StagesFormComponent,
     LevelsFormComponent, LevelsListComponent, ItemListComponent, ItemFormComponent,
      TrainersFormComponent, TrainersListComponent, OrdersFormComponent, OrdersDetailsComponent,
      OrdersListComponent, OrdersSubscriberComponent,
       SubscriberListComponent, SubscriberFormComponent, StudentsComponent, OrderPaymentListComponent, OrderPaymentFormComponent, TrainerAccountReportsComponent, OrderPaymentReportsComponent, OrderReportsComponent, MapsComponent, ReportsComponent, SubscriberDegreeComponent, SubscriberFinishedComponent, SubscriberCertificateComponent, SubscriberCertificateEnglishComponent, MapsFormComponent, SubscriberCardsComponent, SubscriberAddComponent, OrderTrainersReportsComponent
         ],
  imports: [
    
    CommonModule,
    BasicDataRoutingModule,
   ChartsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxPrintModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAzzd8__4jGhbCM_csy-I2-pt82_jP9uRg'
    }),
    NgbModule,
    FlatpickrModule.forRoot(),
    
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    
    
    

  ],
  entryComponents:[
    StagesFormComponent,LevelsFormComponent,TrainersFormComponent,ItemFormComponent,OrdersDetailsComponent
    ,OrdersSubscriberComponent,SubscriberFormComponent,OrderPaymentFormComponent
    ,SubscriberDegreeComponent,SubscriberAddComponent
  ]
})
export class BasicDataModule { }

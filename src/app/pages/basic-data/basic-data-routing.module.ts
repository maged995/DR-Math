import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicDataComponent } from './basic-data.component';
import { AuthGuard } from '../../auth/auth.guard';
import { StagesListComponent } from './stages/stages-list/stages-list.component';
import { LevelsListComponent } from './stages/levels-list/levels-list.component';
import { TrainersListComponent } from './trainers/trainers-list/trainers-list.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { OrdersFormComponent } from './orders/orders-form/orders-form.component';
import { SubscriberListComponent } from './Subscriber/subscriber-list/subscriber-list.component';
import { StudentsComponent } from './Subscriber/Students.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { TrainersFormComponent } from './trainers/trainers-form/trainers-form.component';
import { OrderPaymentListComponent } from './orders/order-payment/order-payment-list/order-payment-list.component';
import { TrainerAccountReportsComponent } from './orders/trainer-account-reports/trainer-account-reports.component';
import { OrderPaymentReportsComponent } from './orders/order-payment/order-payment-reports/order-payment-reports.component';
import { OrderReportsComponent } from './orders/order-reports/order-reports.component';
import { MapsComponent } from './maps/maps.component';
import { ReportsComponent } from './reports/reports.component';
import { SubscriberFinishedComponent } from './Subscriber/subscriber-finished/subscriber-finished.component';
import { SubscriberCertificateComponent } from './Subscriber/subscriber-certificate/subscriber-certificate.component';
import { MapsFormComponent } from './maps/maps-form/maps-form.component';
import { auth2StrategyOptions } from '@nebular/auth';
import { SubscriberCardsComponent } from './Subscriber/subscriber-cards/subscriber-cards.component';
import { OrderTrainersReportsComponent } from './orders/order-trainers-reports/order-trainers-reports.component';



const routes: Routes = [{
  path: '',
  component: BasicDataComponent,
  canActivate:[AuthGuard],
  children: [
    {
path:'trainerAccount',
component:OrderTrainersReportsComponent
    },
    {
 path:'cards/:id',
component:SubscriberCardsComponent
    },
    {
path:'mapsForm',
component:MapsFormComponent
    },
    {
      path:"certificateAr/:id",
      component:SubscriberCertificateComponent,
      canActivate:[AuthGuard]
          },
    {
path:"certificate/:id",
component:SubscriberCertificateComponent,
canActivate:[AuthGuard]
    },
    {
path:'StudentsFinished',
component:SubscriberFinishedComponent,
canActivate:[AuthGuard]
    },
    {
      path:'reports',
      component:ReportsComponent,
      canActivate:[AuthGuard]
    },
    {
path:'mapsGovernorate',
component:MapsComponent,
canActivate:[AuthGuard]
    },
    {
path:'mapsTrainer',
component:MapsComponent,
canActivate:[AuthGuard]
    },
    {
      path:'mapsAdmin',
      component:MapsComponent,
      canActivate:[AuthGuard]
    },
    {
path:'mapsByTrainer',
component:MapsComponent,
canActivate:[AuthGuard]
    },
    {
      path:'orderReportsTrainer/:id',
      component:OrderReportsComponent,
      canActivate:[AuthGuard]
    },
    {path:'AdminAccountReports/:id',
  component:TrainerAccountReportsComponent,
  canActivate:[AuthGuard]
  },
    {
path:'orderReportsAdmin/:id',
component:OrderReportsComponent,
canActivate:[AuthGuard]
    },
    {
path:'trainerAccountReports',
component:TrainerAccountReportsComponent,
canActivate:[AuthGuard]
    },
    {
      path:'paymentAdminReports/:id',
      component:OrderPaymentReportsComponent,
      canActivate:[AuthGuard]
    },
    {
      path:'paymentTrainerReports/:id',
      component:OrderPaymentReportsComponent,
      canActivate:[AuthGuard]
    },
    {
path:'trainerPayment',
component:OrderPaymentListComponent,
canActivate:[AuthGuard]
    },
    {
      path:'subscriber',
      component:StudentsComponent,
      canActivate:[AuthGuard],
      children:[
        {
          path:':id',
          component:SubscriberListComponent,
          canActivate:[AuthGuard],

        }
      ]
    },
    {
path:'Students',
component:SubscriberListComponent,
canActivate:[AuthGuard]

    },

    {
path:'orderList',
component:OrdersListComponent,
canActivate:[AuthGuard]

    },
    {
path:'ordersForm',
component:OrdersFormComponent,
canActivate:[AuthGuard]

    },
    {
      path:'items/:id',
      component:ItemListComponent,
      canActivate:[AuthGuard]

    },
    {
path:'trainers/:id',
component:TrainersListComponent,
canActivate:[AuthGuard]

    },
    {
path:'levels',
component:LevelsListComponent,
canActivate:[AuthGuard]

    },

  
  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})
export class BasicDataRoutingModule { }

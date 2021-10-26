import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { OrdersService } from '../../../../shared/orders.service';

@Component({
  selector: 'ngx-trainer-account-reports',
  templateUrl: './trainer-account-reports.component.html',
  styles: []
})
export class TrainerAccountReportsComponent implements OnInit {

  TrainerName:string;
  
  Total:number;
  DetailsList:any[]=[];
 TrainerId;
  

    useExistingCss:boolean;
    styleName:string;

  
    constructor(public service:OrdersService,private route:Router,
      private activeRoute:ActivatedRoute) { }
    

      
   
    ngOnInit() {
  
      this.useExistingCss = true;
      if (environment.production) {
            this.useExistingCss = false;
            const elements = document.getElementsByTagName('link');
            for (let index = 0; index < elements.length; index++) {
              if (elements[index].href.startsWith(document.baseURI)) {
                this.styleName += elements[index].href + ',';
              }
            }
            this.styleName = this.styleName.slice(0, -1);
          }

         if(this.activeRoute.snapshot.url[0].path=="trainerAccountReports")
         {

      this.service.getForAccountTrainer().subscribe((res:any)=>{

  this.TrainerName=res.Master.TrainerName;
  
  this.Total=res.Master.Total;
  this.DetailsList=res.result;
 
      
  
      })
    }
    else if (this.activeRoute.snapshot.url[0].path="AdminAccountReports")
    {
      this.TrainerId=this.activeRoute.snapshot.paramMap.get("id");
this.service.getForAdminAccountTrainer(this.TrainerId).subscribe((res:any)=>{
  
  this.TrainerName=res.Master.TrainerName;
  
  this.Total=res.Master.Total;
  this.DetailsList=res.result;
})
    }
    }

    onReports(DocTypeId,DocNum){
      if(this.activeRoute.snapshot.url[0].path=="trainerAccountReports")
      {
      if(DocTypeId==1)
      {
this.route.navigateByUrl('/pages/basicData/orderReportsTrainer/'+DocNum);
      }
      else
      {
        this.route.navigateByUrl('/pages/basicData/paymentTrainerReports/'+DocNum);
      }
    }
    else if(this.activeRoute.snapshot.url[0].path=="AdminAccountReports")
    {
      if(DocTypeId==1)
      {
        this.route.navigateByUrl('/pages/basicData/orderReportsAdmin/'+DocNum);

      }
      else
      {
        this.route.navigateByUrl('/pages/basicData/paymentAdminReports/'+DocNum);

      }
    }

    }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment.prod';
import { TrainerAccountPaymentService } from '../../../../../shared/trainer-account-payment.service';

@Component({
  selector: 'ngx-order-payment-reports',
  templateUrl: './order-payment-reports.component.html',
  styles: []
})
export class OrderPaymentReportsComponent implements OnInit {

  constructor(public service:TrainerAccountPaymentService,private route:Router,private activeRoute:ActivatedRoute) { }
  TreaterPayMentId=this.activeRoute.snapshot.paramMap.get("id");
 
  PaymentDate:Date;
 
  PaymentValue:number;
  PaymentTypeDesc:string;

TrainerName:string
  useExistingCss:boolean=false;
  styleName;

  
  
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
        if(this.activeRoute.snapshot.url[0].path=="paymentTrainerReports")
        {
    this.service.getOneReportForTrainer(this.TreaterPayMentId).subscribe((res:any)=>{
   
      this.PaymentDate=res.PaymentDate;
      this.PaymentTypeDesc=res.PaymentTypeDesc;
      this.TrainerName=res.TrainerName;
      this.PaymentValue=res.PaymentValue;
    
    })
  }
  else if(this.activeRoute.snapshot.url[0].path=="paymentAdminReports"){
    
    this.service.getOneReportForAdmin(this.TreaterPayMentId).subscribe((res:any)=>{
   
      this.PaymentDate=res.PaymentDate;
      this.PaymentTypeDesc=res.PaymentTypeDesc;
      this.TrainerName=res.TrainerName;
      this.PaymentValue=res.PaymentValue;
    
    })
  }


  }


}

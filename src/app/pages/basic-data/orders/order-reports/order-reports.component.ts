import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { OrdersService } from '../../../../shared/orders.service';

@Component({
  selector: 'ngx-order-reports',
  templateUrl: './order-reports.component.html',
  styles: []
})
export class OrderReportsComponent implements OnInit {

  TrainerName:string;
  OrderCode:number;
  OrderDate:Date;
  OrderTotalValue:number;

  OrderDetailsList:any[]=[];

  

    useExistingCss:boolean;
    styleName:string;
    Flag:number=0;
  SerialsList: any[]=[];
  ItemFlagDesc: any;

  
    constructor(public service:OrdersService,private route:Router,
      private activeRoute:ActivatedRoute) { }
      OrderId=this.activeRoute.snapshot.paramMap.get("id");
    

      
   
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

          if( this.activeRoute.snapshot.url[0].path=="orderReportsTrainer")
          {
      this.service.getOneOrderForTrainer(this.OrderId).subscribe((res:any)=>{
        console.log(res);
this.TrainerName=res.Master.TrainerName;
  this.OrderCode=res.Master.OrderCode;
  this.OrderDate=res.Master.OrderDate;
  this.ItemFlagDesc=res.Master.ItemFlagDesc;
  this.OrderTotalValue=res.Master.OrderTotalValue;
  
  this.OrderDetailsList=res.Details;

      
  
      })
    }
else if(this.activeRoute.snapshot.url[0].path=="orderReportsAdmin")
      this.service.getOrderForAdmin(this.OrderId).subscribe((res:any)=>{
        
this.TrainerName=res.Master.TrainerName;
  this.OrderCode=res.Master.OrderCode;
  this.OrderDate=res.Master.OrderDate;
  this.ItemFlagDesc=res.Master.ItemFlagDesc;
  this.OrderTotalValue=res.Master.OrderTotalValue;
  
  this.OrderDetailsList=res.Details;

      
  
      })

    }
}

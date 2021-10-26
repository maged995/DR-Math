import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { NotificationService } from '../../../shared/notification.service';
import { ReportsService } from '../../../shared/reports.service';
import { TrainersService } from '../../../shared/trainers.service';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  Show:boolean=false;
  ResultItem:any[]=[];
  orders:any[]=[];
  Payment:any[]=[];
  Students:any[]=[];
  StudentsAbsence:any[]=[];
  StudentsNotActive:any[]=[];
  StudentsFinished:any[]=[];
  useExistingCss;
  styleName;
  TrainerList$:Observable<any>;
    submitted:boolean=false;
       constructor(
         public service:ReportsService,
        private serviceTrainer:TrainersService,
         private notify:NotificationService) { }
     
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
    
        
            this.service.formReport.get('FirstDate').enable();
            this.service.formReport.get('EndDate').enable();
            this.service.formReport.get('TrainerId').enable();   
        this.TrainerList$=this.serviceTrainer.getAllTrainers(1);
   this.Show=false;
   this.service.formReport;
   
       }
 
     
       get f(){
         return this.service.formReport.controls;
       }
   
       onBack(){
         this.Show=false;
         this.service.formReport;
         this.service.formReport.get('FirstDate').enable();
         this.service.formReport.get('EndDate').enable();
         this.service.formReport.get('TrainerId').enable();

       }
     
     

     
       onSubmit(){
     this.submitted=true;
     if(this.service.formReport.invalid)
     {
     return;
     }
    
     else
     {
     var body={
     ...this.service.formReport.value 
     }
   
  this.Show=true;
  this.service.formReport.get('FirstDate').disable();
  this.service.formReport.get('EndDate').disable();
  this.service.formReport.get('TrainerId').disable();
   
     this.service.postAllReport(body).subscribe((res:any)=>{
      this.ResultItem=res.ResultItem;
this.orders=res.orders;
this.Students=res.Students;
this.Payment=res.Payment;
    this.StudentsAbsence=res.StudentsAbsence;
    this.StudentsFinished=res.StudentsFinished;
    this.StudentsNotActive=res.StudentsNotActive;

     })
    
     }
     
     
     
       }
  

}

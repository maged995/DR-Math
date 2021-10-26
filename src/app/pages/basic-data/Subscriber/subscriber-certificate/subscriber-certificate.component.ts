import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { SubscriberService } from '../../../../shared/subscriber.service';

@Component({
  selector: 'ngx-subscriber-certificate',
  templateUrl: './subscriber-certificate.component.html',
  styleUrls: ['./subscriber-certificate.component.css']
})
export class SubscriberCertificateComponent implements OnInit {
  useExistingCss: boolean;
  styleName: string;
  SubscriberNameEn:string;
  SubscriberDate:Date;
  FinishedDate:Date;
  EstimateNameEn:string;
  TrainerName:string;
  SubscriberId: any;
  English: boolean;
  LevelEng: any;
  SubscriberNameAr: any;
  EstimateNameAr: any;
  TrainerNameEn:any;
  LevelDesc: any;
  LevelNo:any;
  SubscriberLevelCode:any;
  constructor(private service:SubscriberService,private activeRoute:ActivatedRoute) { }

  ngOnInit() {

    this.useExistingCss = true;
    if (environment.production) {
          this.useExistingCss = true;
          const elements = document.getElementsByTagName('link');
          for (let index = 0; index < elements.length; index++) {
            if (elements[index].href.startsWith(document.baseURI)) {
              this.styleName += elements[index].href + ',';
            }
          }
          this.styleName = this.styleName.slice(0, -1);
        }
        if(this.activeRoute.snapshot.url[0].path=="certificate")
        {
this.English=true;
        }
        else
        {
this.English=false;
        }
        this.getSubscriber();


  }

  getSubscriber(){
    this.SubscriberId=this.activeRoute.snapshot.paramMap.get('id');
this.service.getOneFinished(this.SubscriberId).subscribe((res:any)=>{
  console.log(res)
  this.EstimateNameEn=res.EstimateNameEn;
  this.EstimateNameAr=res.EstimateNameAr;
  this.TrainerName=res.TrainerName;
  this.TrainerNameEn=res.TrainerNameEn;
  this.LevelEng=res.LevelEng;
  this.LevelNo=res.LevelNo;
  this.LevelDesc=res.LevelDesc;
  this.SubscriberDate=res.SubscriberLevelDate;
  this.FinishedDate=res.FinishedDate;
  this.SubscriberNameEn=res.SubscriberNameEn;
  this.SubscriberNameAr=res.SubscriberNameAr;
  this.SubscriberLevelCode=res.SubscriberLevelCode;
})
  }

}

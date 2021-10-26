import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { resolve } from 'path';
import { environment } from '../../../../../environments/environment.prod';
import { SubscriberService } from '../../../../shared/subscriber.service';

@Component({
  selector: 'ngx-subscriber-cards',
  templateUrl: './subscriber-cards.component.html',
  styles: []
})
export class SubscriberCardsComponent implements OnInit {

 
  number:number=0;
  imageUrl:SafeUrl="";
  SubscriberId;
  subscriber;
  SubscriberNameAr;
  SubscriberNameEn;
  SubscriberCode;
  SubscriberDate;
  GovernorateDesc;
  BirthDate;
  TrainerName;
  useExistingCss: boolean;
  styleName: string;
  Type: string;
  SubscriberLevelId: string;
  constructor(private service:SubscriberService,private activateRoute:ActivatedRoute,
    private sanitizer:DomSanitizer) { }

  ngOnInit() {
   
    this.useExistingCss = true;
    if (environment.production) {
          this.useExistingCss =true;
          const elements = document.getElementsByTagName('link');
          for (let index = 0; index < elements.length; index++) {
            if (elements[index].href.startsWith(document.baseURI)) {
              this.styleName += elements[index].href + ',';
            }
          }
          this.styleName = this.styleName.slice(0, -1);
        }

 
        this.Type=this.activateRoute.snapshot.url[0].path;

    this.SubscriberLevelId=this.activateRoute.snapshot.paramMap.get('id');

    this.service.getOneCardSubscriber(this.SubscriberLevelId).subscribe((res:any)=>{

      this.SubscriberNameAr=res.SubscriberNameAr;
      this.SubscriberNameEn=res.SubscriberNameEn;
      this.SubscriberCode=res.SubscriberCode;
      this.SubscriberDate=res.SubscriberLevelDate;
      this.BirthDate=res.BirthDate;
      this.GovernorateDesc=res.GovernorateDesc;
      this.TrainerName=res.TrainerName;
            
      this.service.getOnePathSubscriber(res.SubscriberId).subscribe(blob=>{
      
     
     
    let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
   // this.subscriber=blob.subscriber;
     this.imageUrl=sanitizedUrl;

      });

    });
    }
  

}

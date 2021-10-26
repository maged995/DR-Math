import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { timingSafeEqual } from 'crypto';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { SubscriberService } from '../../../shared/subscriber.service';
import { TrainersService } from '../../../shared/trainers.service';

@Component({
  selector: 'ngx-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit,OnDestroy {

  SubscribersList:any[]=[];
StudentsNotActive:any[]=[];
StudentsIsClosed:any[]=[];
Students:any[]=[];
trainerList$:Observable<any>;
  TrainerValid: boolean;
  zoom: number;
  courses: any;
  Incubations: any;
  Schools: any;
  sub: any;
  Type: string;
  useExistingCss: boolean;
  styleName: string;
  TrainerId:number;
  constructor(private service:SubscriberService,
    private serviceTrainer:TrainersService,
    private route:Router
    ,
    private activeRoute:ActivatedRoute) {

      this.sub=this.route.events.subscribe(res=>{
        if(res instanceof NavigationEnd)
        {
          this.route.navigated=false;
        }
      })
     }
  ngOnDestroy(): void {
    if(this.sub)
    {
      this.sub.unsubscribe();
    }
    }

  ngOnInit() {
this.TrainerId=0;
    
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

    this.sub=this.activeRoute.params.subscribe(res=>{
    
      this.Type=this.activeRoute.snapshot.url[0].path;
      
    
      this.getLocations();
    })
    
  
  }

  onReturn(){
    this.TrainerValid=true;
  }

  changeTrainer(ctrl){
this.TrainerId=0;
        if(typeof(ctrl)==="undefined"){
    
        }
        else 
        {
          this.TrainerValid=false;
    this.service.getSubscribersForAdminByTrainer(ctrl.TrainerId).subscribe((res:any)=>{
      
      this.SubscribersList=res.res;
      this.StudentsIsClosed=res.StudentsIsClosed;
      this.StudentsNotActive=res.StudentsNotActive;
      this.Students=res.Students;
      this.courses=res.courses;
      this.Incubations=res.Incubations;
      this.Schools=res.Schools;
      this.TrainerId=ctrl.TrainerId;
    })
        }
      }

      StartAccount(){
        this.route.navigateByUrl('/pages/basicData/AdminAccountReports/'+this.TrainerId);
      }

  getLocations(){
    if(this.Type=="mapsTrainer")
    {
      this.TrainerValid=false;
this.service.getSubscrbersForTrainer().subscribe((res:any)=>{
 
  this.SubscribersList=res.res;
  this.Students=res.Students;
  this.StudentsIsClosed=res.StudentsIsClosed;
  this.StudentsNotActive=res.StudentsNotActive;

  this.courses=res.courses;
  this.Incubations=res.Incubations;
  this.Schools=res.Schools;})
    }

    if(this.Type=="mapsGovernorate")
    {
      this.TrainerValid=false;
this.service.getSubcribersForCountry().subscribe((res:any)=>{
 
  this.SubscribersList=res.res;
  this.courses=res.courses;
  this.Incubations=res.Incubations;
  this.Schools=res.Schools;
  })
    }
    else if(this.Type=="mapsAdmin")
    {
      this.TrainerValid=false;
      this.service.getSubscribersForAdmin().subscribe((res:any)=>{
        
      this.SubscribersList=res.res;
      this.Students=res.Students;
      this.StudentsIsClosed=res.StudentsIsClosed;
      this.StudentsNotActive=res.StudentsNotActive;
      this.courses=res.courses;
      this.Incubations=res.Incubations;
      this.Schools=res.Schools;
      })

    }
  
    else if(this.Type=="mapsByTrainer")
    {
      this.TrainerValid=true;
this.trainerList$=this.serviceTrainer.getAllTrainers(1);    
    }


    
    
  }


  onCard(SubscriberLevelId){
  this.route.navigateByUrl('/pages/basicData/cards/'+SubscriberLevelId)
  }

}

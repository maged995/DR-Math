import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-subscriber',
  templateUrl: './Students.component.html',
  styles: []
})
export class StudentsComponent implements OnInit {

  title = 'المشتركين';  
  navLinks: any[];
  activeLinkIndex = -1; 
  constructor(private router: Router) {
    this.navLinks = [
        {
            label: ' طلاب',
            link: '/pages/basicData/subscriber/1',
            index: 0,
            
            
        },
        {
            label: 'حضانات ',
            link: '/pages/basicData/subscriber/2',
            index: 1
        },

        {
          label: 'مدارس',  
          link: '/pages/basicData/subscriber/3',
          index: 1
      },
      {
        label:'كورسات',
        link:'/pages/basicData/Subscriber/4'
      }
   
    
     
  
    ];
}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}

}

import { Component, OnInit, OnDestroy } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem } from '@nebular/theme';
import { NbMenuItemWithPermissions } from './pagesClass';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout >
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent  implements OnInit {
  menu:NbMenuItemWithPermissions[];
  subscribe:Subscription
constructor(private router:Router){
  
}
  ngOnInit(): void {
    if(localStorage.getItem('token')==null){
this.router.navigateByUrl('/users/login');
    }
    this.menu=MENU_ITEMS;
    
  }

 /* reloadComponent(){
    this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
    this.router.onSameUrlNavigation="reload";
    this.router.navigate(['/pages']);
  }
  */
  

}

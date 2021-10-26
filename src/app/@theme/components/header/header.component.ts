import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsersService } from '../../../shared/users.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [  { title: 'Log out',link:'/users/logout' } ];
  hideMenuOnClick: boolean=false;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
            //  private userService: UserData,
            private userService:UsersService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {

    this.currentTheme = this.themeService.currentTheme;

   /* this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user ={'name':"AHMED"}); //users.nick);
      */
  
var payload= JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
this.userService.getUserName(payload.UserID).subscribe((res:any)=>{

  this.user={"name":res.UserName}
}
  );

    

    const { xl } = this.breakpointService.getBreakpointsMap();
    const {is} = this.breakpointService.getBreakpointsMap();

    this.themeService.onMediaQueryChange()
      .pipe(
        //map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        map(([, currentBreakpoint]) => currentBreakpoint),


        takeUntil(this.destroy$),
      )
      //.subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
      .subscribe(currentBreakpoint => {
        this.userPictureOnly = currentBreakpoint.width < xl;
        this.hideMenuOnClick = currentBreakpoint.width <= is;
      });

      this.menuService.onItemClick().subscribe(() => {
        if (this.hideMenuOnClick) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
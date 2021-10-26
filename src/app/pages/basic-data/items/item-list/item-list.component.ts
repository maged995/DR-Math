import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { ItemFlagsService } from '../../../../shared/item-flags.service';
import { ItemsService } from '../../../../shared/items.service';
import { NotificationService } from '../../../../shared/notification.service';
import { LevelsFormComponent } from '../../stages/levels-form/levels-form.component';
import { ItemFormComponent } from '../item-form/item-form.component';

@Component({
  selector: 'ngx-item-list',
  templateUrl: './item-list.component.html',
  styles: []
})
export class ItemListComponent implements OnInit,OnDestroy {

  ItemFlagId;
  ItemFlagDesc: any;


  constructor(private service:ItemsService,
    private route:Router,public dialog: MatDialog,private activateRoute:ActivatedRoute,
    private serviceItemFlags:ItemFlagsService,
    private confirm:DialogService,private notify:NotificationService) { }
  ngOnDestroy(): void {
this.sub.unsubscribe();
  }
    sub;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['ItemDesc','ItemSellPrice','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.sub=this.activateRoute.params.subscribe(res=>{ 
      this.ItemFlagId=this.activateRoute.snapshot.paramMap.get('id');
      this.getItems();
    
    })


  }

  getItems(){
    
    this.ItemFlagId=this.activateRoute.snapshot.paramMap.get('id');
    this.serviceItemFlags.getOneItemFlags(this.ItemFlagId).subscribe((result:any)=>{
      this.ItemFlagDesc=result.ItemFlagDesc;
    })
    this.service.getAllItemByFlag(this.ItemFlagId).subscribe( (res:any)=>{
      console.log(res)
      this.listData = new MatTableDataSource(res);
    
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

      this.listData.filterPredicate = (data, filter) => {
     
        return this.displayedColumns.some(ele => {
          if(typeof data[ele]==="string")
          {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          }
        });        
      };
    });
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreateOrEdit(ItemId){
let ItemFlagId=this.ItemFlagId;
 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = {  ItemId,ItemFlagId};
    this.dialog.open(ItemFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getItems();
    });
  }

  onDelete(ItemId)
  {
    this.confirm.openConfirmDialog('هل انت متاكد من الحذف؟').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteItem(ItemId).subscribe(res=>{
          this.notify.error('تم الحذف بنجاح');
          this.getItems();
        })
      }
    })
  }


}

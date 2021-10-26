import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RolesService } from '../../../../shared/roles.service';
import { NotificationService } from '../../../../shared/notification.service';


@Component({
  selector: 'ngx-roles-claims',
  templateUrl: './roles-claims.component.html',
  styleUrls: ['./roles-claims.component.scss']
})
export class RolesClaimsComponent implements OnInit {

  submitted:boolean=false;

  constructor(
    public service:RolesService,public dialogRef: MatDialogRef<RolesClaimsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private notify:NotificationService) { }

  ngOnInit() {


this.service.getRoleClaims(this.data.Id).subscribe((res:any)=>{
this.service.adminClaimList=res.Cliams.filter(a=>a.ClaimFlag=="admin");
this.service.trainerClaimList=res.Cliams.filter(a=>a.ClaimFlag=="trainer");
this.service.securityClaimList=res.Cliams.filter(a=>a.ClaimFlag=="Security");

});
  }


/*
  selectALLbasicData(ctrl){
    if(ctrl.target.checked)
    {
    this.service.basicDataClaimsList.forEach((element:any) => {
  element.IsSelected=true;
});
    }
    else 
    {
      this.service.basicDataClaimsList.forEach((element:any) => {
        element.IsSelected=false;
      }); 
    }
  }


 
*/
  

  onSubmit(){
   var body={
    RoleId:this.data.Id,
    Cliams:this.service.adminClaimList.concat(this.service.trainerClaimList,this.service.securityClaimList)
   }
   this.service.postRoleClaims(body).subscribe(res=>{
     this.notify.success("تم التعديل بنجاح");
   
     this.dialogRef.close();
   })
    
  }

 
  onClose(){
    this.dialogRef.close();
  }

}

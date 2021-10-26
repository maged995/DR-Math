import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'ngx-mat-content-dialog',
  templateUrl: './mat-content-dialog.component.html',
  styleUrls: ['./mat-content-dialog.component.css']
})
export class MatContentDialogComponent implements OnInit {

 
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<MatContentDialogComponent>) { }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close();
  }


}

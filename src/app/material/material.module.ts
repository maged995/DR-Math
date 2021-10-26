import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material'
import { materialize } from 'rxjs/operators';
import {ScrollingModule}from'@angular/cdk/scrolling'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatTableModule,
  Material.MatDialogModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatIconModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTabsModule,
    Material.MatRadioModule,
    Material.MatExpansionModule,
    Material.MatGridListModule,
   
    Material.MatDatepickerModule,
    Material.MatDatepickerModule,
    Material.MatButtonModule,
    Material. MatFormFieldModule,
    Material.MatNativeDateModule,
    Material.MatCardModule,
    ScrollingModule


  ],
  exports:[
    Material.MatToolbarModule,
    Material.MatTableModule,
  Material.MatDialogModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatIconModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTabsModule,
    Material.MatRadioModule,
    Material.MatExpansionModule,
    Material.MatGridListModule,
    Material.MatDatepickerModule,
    Material.MatDatepickerModule,
    Material.MatButtonModule,
    Material. MatFormFieldModule,
    Material.MatNativeDateModule,
    Material.MatCardModule,
    ScrollingModule
  ]
})
export class MaterialModule { }

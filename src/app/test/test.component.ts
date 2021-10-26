import { Component, OnInit } from '@angular/core';
import { TestService } from '../shared/test.service';

@Component({
  selector: 'ngx-test',
  templateUrl: './test.component.html',
  styles: []
})
export class TestComponent implements OnInit {

  /*
  title = 'My first AGM project';
  
  lat =31.034406600000004;
  lng = 30.459273;
  name="ahmed";
  label="ahmed"
  lat2=31.01002087863203;
  lng2=30.59564812500002;
  name2="mohamed";
  label2="mohamed";
  zoom=9;
  constructor(private serviceTest:TestService) { }
*/
  ngOnInit() {
    /*
    this.getLocation();
    */
  }
/*
  getLocation(){
    this.serviceTest.getLocationService().then(resp=>{
      console.log(resp.lng);
      console.log(resp.lat);
    })
  }

  mapClick(event){
    console.log(event);
  }

  mapDbClick(event){
console.log(event)
  }

  */

}

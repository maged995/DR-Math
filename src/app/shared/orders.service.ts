import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

ordersForm:FormGroup=this.fb.group({
  OrderId:[""],
  OrderTotalValue:[""],
})

orderDetailForm:FormGroup=this.fb.group({
  OrderDetailId:[""],
  OrderId:[""],
  ItemId:["",Validators.required],
  ItemDesc:["",Validators.required],
  ItemFlagId:["",Validators.required],
  ItemFlagDesc:["",Validators.required],
  ItemPrice:["",Validators.required],
  ItemQuantity:["",[Validators.required,Validators.min(1)]],
  ItemTotalPrice:["",Validators.required],
  Subscriber:[false]
})

SubsriberForm=this.fb.group({
  Subscibers:this.fb.array([
    this.addSubsciber()
  ])
})


addSubsciber():FormGroup{
  return this.fb.group({
    OrderSubscriberId:["0"],
    OrderDetailId:["0"],
   // ItemId:["",Validators.required],
    SubscriberId:["",[Validators.required,RxwebValidators.unique()]]
  })
}

OrderDetailList:any[]=[];
ItemDetailList:any[];
OrderSubscriberList:any[]=[];

getForAdmin(){
  return this.http.get(environment.apiUrl+"Orders/getForAdmin")
}
postOrders(body){
return this.http.post(environment.apiUrl+"Orders",body)
}

deleteOrder(OrderId){
return this.http.delete(environment.apiUrl+"Orders/DeleteOrder?id="+OrderId)
}

ApprovalOrder(OrderId){
  return this.http.delete(environment.apiUrl+"Orders/ApprovalOrder?id="+OrderId)

}
getForAccountTrainer(){
  return this.http.get(environment.apiUrl+"Orders/getForAccountTrainer")
}

getForAdminAccountTrainer(TrainerId){
  return this.http.get(environment.apiUrl+"Orders/getAccountAdminTrainer?TrainerId="+TrainerId)
}

getOneOrderForTrainer(OrderId){
return this.http.get(environment.apiUrl+"Orders/getForTrainer?OrderId="+OrderId)
}


getOrderForAdmin(OrderId){
  return this.http.get(environment.apiUrl+"Orders/getOneOrderForAdmin?OrderId="+OrderId)

}

}

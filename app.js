(function(){
'use strict';
angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyList)
.controller('AlreadyBoughtController',AlreadyBoughtStuff)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyList.$inject=['ShoppingListCheckOffService'];
function ToBuyList(ShoppingListCheckOffService){
  var toBuy=this;
  toBuy.items=ShoppingListCheckOffService.getItems();

  toBuy.sendToBoughtList=function(itemName,itemQuantity,index){
  console.log(itemName);
  try{
  ShoppingListCheckOffService.moveToAlreadyBought(itemName,itemQuantity,index);
}catch(error){
  toBuy.errorMessage=error.message;
}


  };

}
AlreadyBoughtStuff=['ShoppingListCheckOffService'];
function AlreadyBoughtStuff(ShoppingListCheckOffService){
var AlreadyBoughtStuff=this;

AlreadyBoughtStuff.alBoughtItems=ShoppingListCheckOffService.getAlreadyBouught();

}


function ShoppingListCheckOffService(){
   var service = this;

  var toBuyItems=[{
    item: "cookies",
    quantity: "5 bags"
  },{
    item: "brownie",
    quantity:"10 bags"
  },{
    item: "candy",
    quantity:"15 bags"
  },{
    item: "bread",
    quantity:"2 bags"
  },{
    item:"salad",
    quantity:"3 bags"
  }];

var AlreadyBoughtitem=[];

   service.getItems=function(){
    return toBuyItems;
  };

service.moveToAlreadyBought=function(itemName,qty,index){

  var newItem={
    item:itemName,
    quantity:qty
  };
  AlreadyBoughtitem.push(newItem);
  toBuyItems.splice(index,1);
  if(toBuyItems.length===0){
    throw new Error("Show Message");
  }

};

service.getAlreadyBouught=function(){
  return AlreadyBoughtitem;
};

}
})();

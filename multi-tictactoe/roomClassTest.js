const arr = ['x', null]

let isEmpty = true;
for(el of arr){
  if(el !== null) {
    isEmpty = false;
    break;
  }
}
console.log(isEmpty)
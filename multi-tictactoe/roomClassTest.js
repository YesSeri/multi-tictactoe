class Room {
  constructor(name, clientX, clientO) {
    this.name = name;
    this.clientX = clientX;
    this.clientO = clientO;
    
  }
  isRoomFull(){
    return (this.clientX && this.clientO) 
  }
}

const room = new Room('aaa333', true, true)

console.log(room.isRoomFull());

//console.log(Object.getOwnPropertyNames(String.prototype))

class Room {
    constructor(name, clientX, clientO) {
        this.name = name;
        this.clientX = clientX;
        this.clientO = clientO;
    }
    function toString() {
    }
}

const room = new Room('aaa333', 'pelle', 'kalle')

console.log(room.toString())
console.log(Object.getOwnPropertyNames(String.prototype))

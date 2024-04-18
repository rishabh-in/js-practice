let obj1 = {
  firstName: "Rishabh",
  lastName: "Tiwari"
}

console.log(obj1.__proto__)

console.log(Object.prototype)

console.log(obj1.__proto__ == Object.prototype)



let arr = [1,2,3,4,5]

console.log(arr);
console.log(arr.isArray())
console.log(Array.prototype)
console.log(arr.__proto__ == Array.prototype)

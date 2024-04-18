let person = {
  firstName: "Rishabh",
  lastName: "Tiwari"
}

let printName = function (city, state) {
  console.log(this.firstName + " " + this.lastName + " from " + city + ", " + state);
}

Function.prototype.myBind = function (...args) {
  // this ----> printName bcoz it is invoking the methods myBind
  let obj = this;
  let params = args.slice(1);
  return function (...args2) {
    // obj.call(args[0], params);
    obj.apply(args[0], [...params, ...args2]);
  }
}


let newFunction = printName.myBind(person, ["Rudrapur"]);
newFunction("Uttarakhand") // Rishabh Tiwari
let obj = {
  name: "Rishabh"
}

function printName( city, state ) {
  console.log("My name is " + this.name + ". I live in "+ city + ", " + state);
}

// let newFunction = printName.myBind(obj); 
// newFunction() ---> my name is rishabh


function myBind (...args) {
  // this ---> printName
  let self = this;
  let params = args.slice(1);
  return function (...args2)  {
    self.apply(args[0], [...params, ...args2])
  }
}

Function.prototype.myBind = myBind;

let newFunction = printName.myBind(obj, ["Rudrapur"]);
newFunction("Uttarakhand")
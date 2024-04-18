// Using bind method
console.log("using bind----------------------------------------")
let multiply = function(x, y) {
  console.log(x * y)
}

let multiplyBy2 = multiply.bind(this, 2);
multiplyBy2(3)

let multiplyBy3 = multiply.bind(this,3);
multiplyBy3(4)


// Using closures;
console.log("using closures----------------------------------------")

function newMultiply(x) {
  return function (y) {
    console.log(x * y);
  }
}

newMultiply(5)(4)

let newMultiplyBy2 = newMultiply(2);
multiplyBy2(3)

let newMultiplyBy3 = newMultiply(3);
multiplyBy3(4)


function sum(x) {
  return function (y) {
    if(y) {
      return sum(x+y);
    }
    return x;
  }
}


const result = sum(1)(2)(3)(4)(5)();
console.log(result);
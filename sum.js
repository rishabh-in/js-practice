// sum(1)(2)(3)...();


function printSum(a) {
  return function (b) {
    if(!b) {
      return a;
    }
    return (printSum(a + b));
  }
}


let result = printSum(1)(2)(4)();
console.log(result)


// ES6 syntax

let sum = a => b => b ? (sum(a+b)) : a
console.log(sum(1)(2)(3)(4)())


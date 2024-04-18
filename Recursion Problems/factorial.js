//Normal Solution

function calculateFactorial(n) {
  if(n == 0) {
    return 1;
  }
  if(n == 1) {
    return 1
  }
  result = 1;
  while(n != 0) {
    result = result * (n)
    n = n - 1;
  }
  return result;

}

console.log(calculateFactorial(5));


// Recursion

function recursionFactorial(n) {
  if(n == 0 || n == 1) {
    return 1;
  }
  return n * recursionFactorial(n - 1);
}

console.log(recursionFactorial(5))
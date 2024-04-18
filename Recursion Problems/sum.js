// sum range

//Write a function called sumRange. It will take a number and return the sum of all numbers from 1 up to the number passed in.

// Sample: sumRange(3) returns 6, since 1 + 2 + 3 = 6.

// Normal solution
function sumRange(n) {
  let totalSum = 0;
  for(let i = 1; i <= n; i++) {
    totalSum += i;
  }
  return totalSum;
}

let sum = sumRange(3);
console.log(sum)


// Recursive Solution;
function recursiveSum(n) {
  if(n == 0) {
    return 0;
  }
  return n + recursiveSum(n-1)
}

let output = recursiveSum(4);
console.log(output)
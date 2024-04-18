//Write a function called power which takes in a base and an exponent. If the exponent is 0, return 1.

function power(n, pow) {
  if(pow === 0) {
    return 1;
  }
  return n * power(n, pow-1);
}
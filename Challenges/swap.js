let a = 10;
let b = 20;

// Using destructuring assignment using array

[a, b] = [b, a];

console.log(a, b);


// another method
a = a + b;
b = a - b;
a = a - b;

console.log(a, b)
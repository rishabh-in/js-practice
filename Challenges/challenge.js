// Write a function which returns true if given value of number is an integer without using any inbuilt functions

function isInt(num) {
  return num % 1 == 0;
}

console.log(isInt(5));


// Create a function which returns a random number in the given range of values both inclusive

function randomNumberGenerator(start, end) {
  return start + Math.round(Math.random() * (end - start));
}

console.log(randomNumberGenerator(25, 50))



// Write a program to reverse a string

function reverseString(inputString) {
  let outputString = "";
  for(let i of inputString) {
    outputString = i + outputString;
  }
  return outputString
} 

console.log(reverseString("rishabh"))

// Another way
let str = "Rishabh";
console.log(str.split("").reverse().join(""))


// Reverse a string by word

str = "Js is amazing";
console.log(str.split(" ").reverse().join(""))

// split will convert the string into array. if we use split("") -> then it will split each characters and create an array
// reverse is an array method, it will reverse the array
// join will join the array elements and create a string

// reverse word and characters;
console.log(str.split(" ")
.map(c => c.split("").reverse().join(""))
.reverse()
.join(" ")
)


// Reverse a given integer number
let num = 1234;
let output = 0;
while(num != 0) {
  let rem = num % 10;
  output = output * 10 +  rem 
  num = Math.floor(num / 10);
}
console.log(output)

let num2 = 3456;
num2 = String(num2);
console.log(Number(num2.split("").reverse().join("")))


// Write a code to replace all the spaces of the string with underscores

let str2 = "I am working as a full stack developer";
// using split and join
console.log(str2.split(" ").join("_"))
console.log(str2.replaceAll(" ", "_"))




// The following code outputs 2 and 2 after waiting for one second
// Modify the code to output 0 and 1 after one second.


function randomFunc(){
  for(var i = 0; i < 2; i++){
    function close(i) {
      setTimeout(()=> console.log(i),1000);
    }
    close(i)
  }
  }
  randomFunc();
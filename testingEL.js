const fs = require("fs");

// console.log("Start");

let timerId = setTimeout(() => {
  console.log("Set timeout 3sec completed");
}, 1000);


fs.readFile("./output.txt", (err, data) => {
  if(err) {
    console.log("Error");
    return 0;
  }
  console.log("Inside fs module");
})


setImmediate(() => {
  console.log("Inside set Immedidate");
})

// console.log("end");
//Write a function called all which accepts an array and a callback and returns true 
//if every value in the array returns true when passed as parameter to the callback function

//normal solution

function cb(val) {
  if(val < 10) {
    return true; 
  } else {
    return false;
  }
}

function all(arr, cb) {
  for(val of arr) {
    let result = cb(val);
    if(!result) {
      return false;
    }
  }
  return true;
}

console.log(all([1,2,3,4,5], cb))


// Recursive solution


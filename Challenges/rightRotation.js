let arr = [1,2,3,4,5,6,7];

function rotateRight(array, rotation) {
  for(let i = 0; i < rotation; i++) {
    array.unshift(arr.pop());
  }
  console.log(array)
}

rotateRight(arr, 3);
console.log(arr)
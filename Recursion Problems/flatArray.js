// Flat Array
let arr = [1,2,[3,4,5, [6,7,8,9], [10,11,12]], [13,14,15,[16,17,18]]];

let resultArr = [];
function flatArray(arr) {
  arr.forEach(element => {
    if(Array.isArray(element)) {
      return flatArray(element)
    } else {
      resultArr.push(element)
    }
  });
  return resultArr;
}
let result = flatArray(arr)
console.log(result)
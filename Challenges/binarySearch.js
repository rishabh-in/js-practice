let arr =[1,2,3,4,5,6,7,8,9];

function binarySearch(arr, searchVal) {
  let start = 0;
  let end = arr.length - 1;


  while(start <= end) {
    let mid = Math.floor((start + end) / 2);
    if(arr[mid] == searchVal) {
      return mid;
    } else if(arr[mid] < searchVal) {
      start = mid + 1;
    } else{
      end = mid - 1;
    }
  }
  return -1
}

console.log(binarySearch(arr, 2));



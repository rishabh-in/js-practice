let radius = [1,4,2,5,6];

let area = radius =>  radius * radius;

let parameter = radius => 2 * 3.14 * (radius * radius);

function calculate (radius, operation) {
  let answer = [];
  radius.forEach((r) => {
    answer.push(operation(r));
  })
  return answer;
}

console.log(calculate(radius, area));

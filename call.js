console.log("------------------- call method -----------------" )

let person = {
  firstName: "Rishabh",
  lastName: "Tiwari",
  printName: function () {
    // This keywaord refers to how the function is called or the object that the function is property of
    console.log(this.firstName + " " + this.lastName)
  }
}
person.printName()

let person2 = {
  firstName: "Rishav",
  lastName: "Raj"
}

person.printName.call(person2)

//another way of doing this
// create a seperate fucntion printName and then using the function borrowing concept to print name or change the way of treating this keyword

let printFullName = function(hometown) {
  console.log(this.firstName + " " + this.lastName + " from " + hometown) 
}

printFullName.call(person, "Rudrapur");
printFullName.call(person2, "Ranchi");



console.log("--------------------- Apply Method --------------------------");

// The only diff between call and apply is the way you pass arguments
// Call - you pass arguments seperatly 
// Apply - You pass arguments in an array

printFullName.apply(person, ["Rudrapur"]);
printFullName.call(person2, ["Ranchi"]);


console.log("-------------------- Bind Method -------------------------");

let newMethod = printFullName.bind(person2, "Ranchi");
newMethod();

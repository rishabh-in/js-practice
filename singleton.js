class Singleton {
  constructor() {
    Singleton._instance = this;
    console.log(Singleton._instance)
    return Singleton._instance;

  }
}


const obj1 = new Singleton();
const obj2 = new Singleton();

console.log(obj1);
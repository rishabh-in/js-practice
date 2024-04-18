let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise is resolved")
  }, 4000)
})

// Screen is not freezed. Call stack is empty while wating for the promise to resolve

document.getElementById("btn").addEventListener("click", () => {
  console.log("Btn is clicked")
})
// let a = true
// while(a) {
//   console.log("Cool down")
// }

// old way of handling promise 
// Here JS Engine will not wait for the promise to get resolved and continue execution after regestering the callback in the callback queue.
function handlePromiseWithThen () {
  p.then((res) => console.log(res));
  console.log("Hello world")
}

// handlePromiseWithThen();

// Here JS Engine will wait for the promise to resolve and then start execution from where it left
async function handlePromiseWithAwait() {
  console.log("Starting");
  console.log(await p);
  console.log("Let's print in middle also");
  console.log(await p)
  console.log("End");
}

handlePromiseWithAwait()

fetchUserData = async () => {
  let users = await fetch('https://jsonplaceholder.typicode.com/users')
  console.log(await users.json())
}

fetchUserData()
document.getElementById("grandParent").addEventListener("click", (event) => {
  console.log("Grand Parent Is clicked");
  // event.stopPropagation()
}, true)


document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent Is clicked");
})


document.getElementById("child").addEventListener("click", (event) => {
  console.log("Child Is clicked");
  // event.stopPropagation()
})
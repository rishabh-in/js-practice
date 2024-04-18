document.getElementById("parent-list").addEventListener("click", (e) => {
  if(e.target.tagName == "LI") {
    console.log(e.target.textContent)
  }
})
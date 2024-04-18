function addName(e) {
  let newName = document.getElementById("name-input").value;
  addListItem(newName)
  document.getElementById("name-input").value = "";
}

function addListItem(newName) {
  let rootElement = document.getElementById("parent-list");
  let newListItem = document.createElement("li");
  newListItem.textContent = newName;
  rootElement.appendChild(newListItem);
}
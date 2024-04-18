
let renderUI = () => {
  document.getElementById("root").innerHTML = `
  Hello Normal HTML
  <input />
  <pre>${new Date().toLocaleTimeString()}
`

  let component = React.createElement(
    "div", null, "Hello React", 
    React.createElement("input"), 
    React.createElement("pre", null, new Date().toLocaleTimeString())
  )
  ReactDOM.render(component, document.getElementById("root2"));

  function Button(props) {
    return React.createElement(
      "button",
      {type: "submit"},
      "click Me"
    );
  }

  ReactDOM.render(Button(), document.getElementById("root3"))
}

setInterval(renderUI, 1000)
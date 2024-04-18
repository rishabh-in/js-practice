let counter = 0;

// Function to simulate an API call
function makeApiCall() {
  console.log("Api call is made.", counter++);
}

function deleteUserData() {
  console.log("User data is deleted", counter++)
}

// Debouncing function
function debounceMethod(fn, delay) {
  let timerId;

  return function (...args) {
    // Clear the previous timer if the debounced function is called again within the delay period
    if (timerId) {
      clearTimeout(timerId);
    }

    // Preserve the context and arguments for the delayed function execution
    let context = this;
    let arguments = args;

    // Set a new timer for the delayed function execution
    timerId = setTimeout(() => {
      // Execute the debounced function with the preserved context and arguments
      fn.apply(context, arguments);
    }, delay);
  };
}

// Create a debounced version of makeApiCall
let keyIsPressed = debounceMethod(makeApiCall, 400);

// Example usage: keyIsPressed will only execute makeApiCall if there is no further invocation for 300ms
console.log(keyIsPressed);

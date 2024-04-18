"use strict";

let cart = ["Denim Jeans", "Shirt", "Polo", "Shoes", 'Shirt', 'Shoes'];

// create order
// proceed to payment
// show order summary
// update wallet

const createOrder = (cart) => {
  let orderPromise = new Promise((resolve, reject) => {
    if(validateCart(cart)) {
      setTimeout(() => {
        resolve({cart, message: "Cart is valid", totalPrice: 2000})
      }, 3000)
    } else {
      reject("Invalid Cart")
    }
  });
  return orderPromise;
}   

const proceedToPayment = (totalPrice) => {
  return new Promise((resolve, reject) => {
    if(totalPrice > 0) {
      console.log("Payment Processing...")
      setTimeout(() => {
        // perform payment operation
        resolve("Payment successfull");
      }, 5000)
    } else {
      reject("Payment Failed")
    }
  })
}

const showOrderSummary = (paymentInfo) => {
  return new Promise((resolve, reject) => {
    if(paymentInfo === 'Payment successfull') {
      let orderSummary = {};
      setTimeout(() => {
        cart.map((val) => {
          if(orderSummary[val]) {
            orderSummary[val] += 1;
          } else {
            orderSummary[val] = 1;
          }
        })
        resolve(orderSummary);
      }, 4000)
    } else {
      reject("Payment Failed");
    }
  })
} 
const validateCart = (cart) => {
  return cart.length > 0;
}

createOrder(cart)
.then((data) => {
  console.log(data)
  return data.totalPrice;
})
.then((data) => {
  return proceedToPayment(data);
})
.catch((err) => {
  console.log(err);
})
.then((data) => {
  return showOrderSummary(data);
})
.then((data) => {
  console.log(data)
})
.catch((err) => {
  console.log(err);
})
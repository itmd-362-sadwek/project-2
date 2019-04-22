'use strict';
// remove the 'nojs' class and add the 'js' class
var html = document.querySelector('html');
html.classList.remove('nojs');
html.classList.add('js');

// Check if browser can run Javascript
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// NOTE: START OF JAVASCRIPT FOR CHECKOUT PAGE
// Functions from Karl Stolley @ https://github.com/itmd362-2019/demos
// Comparison function
function eq(value, condition) {
  return value === condition;
}

// Functions to clean up data
// Function to clean up phone number inputs from user
function cleanNum(value) {
  return value.replace(/\D/g, '');
}

// Function to clean up whitespace in user input
function cleanWhitespace(value) {
  return value.replace(/\s/g, '');
}

// Function to remove the +1 area code in phone numbers
function removeOne(value) {
  return value.replace(/^1/, '');
}

// Function to validate the user's inputs
function validate(value, check, condition {
  if (eq(typeof(check.test), 'function')) {
    // Check regular expression
    return check.test(value);
  } else if (eq(typeof(check), 'function')) {
    // Check comparison function
    return check(value, condition);
  } else {
    return false;
  }
}

// Function to check phone number
function checkPhone(value) {
  // Remove the one and any non-digits from the phone number if exists
  var phone_input = removeOne(cleanNum(value));
  // Ensure phone number entered is exactly 10 digits
  return validate(phone_input.length, eq, 10);
}

// Function to check email
function checkEmail(value) {
  var email_input = cleanWhitespace(value);
  // Ensure there is an @ in between characters
  return validate(email_input, /^[^@\s]+@[^@\s]+$/g);
}

// Function to check zip code
function checkZip(value) {
  var zipcode = cleanNum(value);
  return validate(zipcode.length, eq, 5);
}

document.addEventListener('DOMContentLoaded', function() {
  // Link DOM elements
  var order = {
    orderForm: document.querySelector('#order-form');,
    name: document.querySelector('#name');,
    confirmButton: document.querySelector('#confirm');,
    contact: document.querySelector('#contact');
    help: document.querySelector('#contact .hint');
    help.innerHTML += ' <b id="err"></b>';
  };

  var location = {
    address: order.orderForm.querySelector('#addy'),
    zipcode: order.orderForm.querySelector('#zip'),
    city: order.orderForm.querySelector('#city'),
    state: order.form.querySelector('state')
  };

  // Focus on user landed input textboxes
  name.addEventListener('focus', function(){});
  contact.addEventListener('focus', function(){});
  address.addEventListener('focus', function(){});
  zipcode.addEventListener('focus', function(){});
  city.addEventListener('focus', function(){});
  state.addEventListener('focus', function(){});

  // Disable submit button without a full 10-digit phone number
  confirmButton.setAttribute('disabled', 'disabled');

  // Listen for a keyup in entire form
  orderForm.addEventListener('keyup', function() {
    var userContact = contact.value;
    var err;
    // If statement to ensure user has typed in phone number OR email
    if(checkPhone(userContact) || checkEmail(userContact)) {
      // Enable submit button if there is a correct phone number OR email
      confirmButton.removeAttribute('disabled');
    } else {
      err = document.querySelector('#err');
      if (userContact.length > 10 && err.innerText.length === 0)
        // Tell user to enter correct input
        err.innerText = 'Please enter a ten-digit phone number or a valid email.';
    }
    // Disable confirm button again due to invalid input from user
    confirmButton.setAttribute('disabled', 'disabled');
  });

// Check to see if the browser supports Fetch API
if ('fetch' in window) {
  // Cool fade-out effect
  location.city.classList.add('fade-out');
  location.state.classList.add('fade-out');

  var zipcode;
  location.zipcode.addEventListener('keyup', function(e) {
    // If statement to make sure no duplicate requests happen
    if (checkZip(location.zipcode.value) && zipcode !== location.zipcode.value) {
      // Fetch zipcode API from Zippopotam.us
      zipcode = location.zipcode.value;
      fetch('http://api.zippopotam.us/us/' + location.zipcode.value)
        .then (function(response) {
          if (response.ok) {
            return response.json();
          }
          throw Error('There is no data for the zip code ' + location.zipcode.value)
        })
        .then (function(parsed_json) {
          location.city.value = parsed_json.places[0] ["place name"];
          location.state.value = parsed_json.places[0] ["state"];
          // Cool fade-in effect
          location.city.classList.add('fade-in');
          location.state.classList.add('fade-in');
        })
        // Do this when an error occurs
        .catch (function(error) {
          location.city.value = '';
          location.state.value = '';
          location.city.classList.add('fade-in');
          location.state.classList.add('fade-in');
        });
    }
  });
}

// Listen for click events on confirm button and submit when clicked
orderForm.confirmButton.addEventListener('click', function(event) {
  // Confirm the order form
  event.preventDefault();
  orderForm.confirmButton.click();
})
// NOTE: END OF JAVASCRIPT FOR CHECKOUT PAGE


var cartItems = localStorage.getItem('item-title', 'item-price', 'item-image', 'order-btn');

cartItems.push(newItem);

localStorage.setItem('item-title', 'item-price', 'item-image', 'order-btn', 'order-btn', cartItems);


function ready() {
    var removeCartItemButtons = document.getElementsByClassName('remove-btn')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('order-btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

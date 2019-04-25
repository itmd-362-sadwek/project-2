'use strict';
// remove the 'nojs' class and add the 'js' class
var html = document.querySelector('html');
html.classList.remove('nojs');
html.classList.add('js');
/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00;
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change( function() {
  updateQuantity(this);
});

$('.product-removal button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;

  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });

  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;

  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}

// NOTE: START OF JAVASCRIPT FOR CHECKOUT PAGE
// FUNCTIONS FROM KARL STOLLEY @ https://github.com/itmd362-2019/demos
// Comparison function
function eq(value, condition) {
  return value === condition;
}

// FUNCTIONS TO CLEAN UP DATA
// Remove all non-digits from input
function cleanNum(value) {
  return value.replace(/\D/g, '');
}
// Remove any whitespace from input
function cleanWhitespace(value) {
  return value.replace(/\s/g, '');
}
// Remove the +1 area code in phone numbers
function removeOne(value) {
  return value.replace(/^1/, '');
}

// FUNCTIONS TO VALIDATE INPUTS
// Check user inputs
function validate(value, check, condition) {
  if (eq(typeof(check.test), 'function')) {
    return check.test(value);
  } else if (eq(typeof(check), 'function')) {
    return check(value, condition);
  } else {
    return false;
  }
}
// Check phone number
function checkPhone(value) {
  // Remove the one and any non-digits from the phone number if exists
  var phoneInput = removeOne(cleanNum(value));
  // Ensure phone number entered is exactly 10 digits
  return validate(phoneInput.length, eq, 10);
}
// Check email
function checkEmail(value) {
  var emailInput = cleanWhitespace(value);
  // Ensure there is an @ in between characters
  return validate(emailInput, /^[^@\s]+@[^@\s]+$/g);
}
// Check zipcode
function checkZip(value) {
  var zipInput = cleanNum(value);
  return validate(zipInput.length, eq, 5);
}

// jQuery Function to hide form after submission
$(document).ready(function() {
  $('#confirm').click(function() {
    $('main').hide(500);
    // Display a thank you message
    $('#msg').show(500);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Link DOM elements
  var order = {};
  var location = {};

  // Order
  order.form = document.querySelector('#order-form');
  order.name = document.querySelector('#name');
  order.contactInfo = document.querySelector('#contact');
  order.confirmButton = document.querySelector('#confirm');
  order.payment = document.querySelector('#payment');

  location.address = order.form.querySelector('#addy');
  location.zipcode = order.form.querySelector('#zip');
  location.city = order.form.querySelector('#city');
  location.state = order.form.querySelector('#state');

  // Listen for a keyup in entire form
  order.form.addEventListener('keyup', function() {
    var userContact = order.contactInfo.value;
    // Check if user has entered phone # OR email
    if (checkPhone(userContact) || checkEmail(userContact)) {
      // Enable submit button if there is a correct phone number OR email
      order.confirmButton.removeAttribute('disabled');
    } else {
      // Display error message
      var err = document.querySelector('#err');
      if (userContact.length > 10 && err.innerText.length === 0)
      // Tell user to enter correct input
      err.innerText = 'Please enter a ten-digit phone number or a valid email.';
    }
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
  order.confirmButton.addEventListener('click', function(event) {
    // Confirm the order form
    event.preventDefault();
    order.confirmButton.click();
  });
}); // End of DOMContentLoaded
// NOTE: END OF JAVASCRIPT FOR CHECKOUT PAGE

//Cart funtions
if (document.querySelector('#cart-items')) {
  var arrayCart = getCartItems('steap-cart');
  // TODO: Display items from arrayCart
}

// JS: Displays and removes customization card

function Drink(name, sugar, ice, toppings) {
  this.name = name;
  this.sugar = sugar;
  this.ice = ice;
  this.toppings = toppings;
}

var drinkName = "";

function storeCartItems(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getCartItems(key) {
  if(Object.keys(localStorage).includes(key))
    return JSON.parse(localStorage.getItem(key));
  else {
    var arrCart = [];
    return arrCart;
  }
}

function toggleCard() {
  var card = document.querySelector('#overlay');
  card.classList.toggle('visible');
  var page = document.querySelector('body');
  page.classList.toggle('disable-scroll');
}

// checks if current page is on menu
if (document.querySelector('#drinks')) {
  var drinksMenu = document.querySelector('#drinks');
  // if there are any clicks happening inside drinksMenu
  // check if it's from an add-to-order btn
  drinksMenu.addEventListener('click',function(event){
    // button = object that was clicked
    var button = event.target;
    if (button.className == 'order-btn'){
      event.preventDefault();
      // reach for h3 text
      drinkName = button.parentElement.previousElementSibling.previousElementSibling.textContent;
      toggleCard();
    }
  });
}

// if the customize-overlay is on display,
// play this js
if (document.querySelector('#overlay')) {
  var overlay = document.querySelector('#overlay');
  // if there are any clicks happening on overlay
  // check if it's from outside the form-card
  overlay.addEventListener('click',function(event){
    // Select the necessary elements from the DOM
    var areaClicked = event.target;
    console.log(areaClicked);
    if (areaClicked == overlay) {
      toggleCard();
    }

    if (areaClicked == overlay.querySelector('#submit-drink')) {
      toggleCard();
      // gets all radio buttons/ checkboxes in the form
      var arrayButtons = overlay.querySelectorAll('.custom-option');
      var toppings = [];
      // loops through all rb/ cb
      for (var option of arrayButtons) {
        // if the rb/cb is from toppings and is one of the chosen ones (hehe)
        // add to toppings array
        if (option.name == 'topping' && option.checked == true) {
          toppings.push(option.value);
        }
      } // end for loop

      // Get values of drinks
      const sugar = overlay.querySelector('.customize-card').elements['sugar-level'].value;
      const ice = overlay.querySelector('.customize-card').elements['ice-level'].value;
      // create new drink
      var newItem = new Drink(drinkName,sugar,ice,toppings);
      // get array of cartItems
      var arrayCart = getCartItems('steap-cart');
      // push new Item to cart
      arrayCart.push(newItem);
      // push cart to localStorage
      storeCartItems('steap-cart', arrayCart);
    } // exit card area
  });
}

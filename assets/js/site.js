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
=======
class Item {
  constructor(button) {
    this.name = button.getAttribute('value');
  }
}

if (document.querySelector('#drinks')) {
  var drinksMenu = document.querySelector('#drinks');
  drinksMenu.addEventListener('click',function(event){
    // Select the necessary elements from the DOM
    var button = event.target;
    if (button.className == 'order-btn')
      event.preventDefault();
      displayCard(event.target);
  });
}

class Item {
  constructor(button) {
    this.name = button.getAttribute('value');
  }
}

if (document.querySelector('#drinks')) {
  var drinksMenu = document.querySelector('#drinks');
  drinksMenu.addEventListener('click',function(event){
    // Select the necessary elements from the DOM
    var button = event.target;
    if (button.className == 'order-btn')
      event.preventDefault();
      displayCard(event.target);
  });
}

function displayCard (button) {
  // parentContainer = li.item-container
  let parentContainer = button.parentElement.parentElement.parentElement;
  // create card section
  let container = document.createElement('section');
  let label = document.createElement('h3');
  label.classList.add('customize');
  let cardContent = `
    <form>
    <article>
      <h3 class="customize-title">Sugar Level</h3>
      <ul class="customize-options">
        <li><input type="radio" id="zero-sugar" class="custom-option" name="sugar-level" value="0">
        <label for="zero-sugar">No Sugar</label></li>
        <li><input type="radio" id="thirty-sugar" class="custom-option" name="sugar-level" value="30">
        <label for="thirty-sugar">30%</label></li>
        <li><input type="radio" id="fifty-sugar" class="custom-option" name="sugar-level" value="50">
        <label for="fifty-sugar">50%</label></li>
        <li><input type="radio" id="thirty-sugar" class="custom-option" name="sugar-level" value="30">
        <label for="thirty-sugar">70%</label></li>
        <li><input type="radio" id="regular-sugar" class="custom-option" name="sugar-level" value="100">
        <label for="regular-sugar">Regular</label></li>
      </ul>
    </article>
    <article>
      <h3 class="customize-title">Ice Level</h3>
      <ul class="customize-option">
        <li><input type="radio" id="no-ice" class="custom-option" name="ice-level" value="No Ice">
        <label for="no-ice">No Ice</label></li>
        <li><input type="radio" id="less-ice" class="custom-option" name="ice-level" value="Less Ice">
        <label for="less-ice">Less Ice</label></li>
        <li><input type="radio" id="normal-ice" class="custom-option" name="ice-level" value="Normal Ice">
        <label for="normal-ice">Normal Ice</label></li>
      </ul>
    </article>
    <article>
      <h3 class="customize-title">Topping</h3>
      <ul class="customize-option">
        <li><input type="checkbox" id="tapioca" class="custom-option" name="topping" value="Tapioca">
        <label for="tapioca">Tapioca</label></li>
        <li><input type="checkbox" id="coco-jelly" class="custom-option" name="topping" value="Coconut Jelly">
        <label for="coco-jelly">Coconut Jelly</label></li>
        <li><input type="checkbox" id="red-bean" class="custom-option" name="topping" value="Red Bean">
        <label for="red-bean">Red Bean</label></li>
        <li><input type="checkbox" id="pudding" class="custom-option" name="topping" value="Pudding">
        <label for="pudding">Pudding</label></li>
        <li><input type="checkbox" id="pop-bubbles" class="custom-option" name="topping" value="Popping Bubbles">
        <label for="pop-bubbles">Popping Bubbles</label></li>
      </ul>
    </article>
    </form>
  `;
  container.innerHTML = cardContent;
  container.classList.add('customize-card');
  parentContainer.insertAdjacentElement('afterend',container);
}
<<<<<<< HEAD
>>>>>>> Add code that displays customizing card
=======
>>>>>>> Add code that displays customizing card

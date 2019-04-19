'use strict';
// remove the 'nojs' class and add the 'js' class
var html = document.querySelector('html');
html.classList.remove('nojs');
html.classList.add('js');

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
//cart
var cartItems = localStorage.setItem('shop-item-title', 'item-price');

cartItems.push(newItem);

localStorage.setItem('shop-item-title', 'item-price');

var cartItems = localStorage.getItem('shop-item-title', 'item-price');

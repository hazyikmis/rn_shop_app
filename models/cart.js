class CartItem {
  //id not required because ... check the /reducers/cart.js, "id" is already used as a key, no need to put inside this object again
  constructor(quantity, productPrice, productTitle, sum) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItem;

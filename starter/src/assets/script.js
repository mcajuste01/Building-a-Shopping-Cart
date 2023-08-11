const products = [
  {
    name: 'Cherry',
    price: 1.99,
    quantity: 0,
    productId: 1,
    image: './images/cherry.jpg'
  },
  {
    name: 'Orange',
    price: 0.99,
    quantity: 0,
    productId: 2,
    image: './images/orange.jpg'
  },
  {
    name: 'Strawberry',
    price: 2.49,
    quantity: 0,
    productId: 3,
    image: './images/strawberry.jpg'
  },
];

const cart = [];

let totalPaid = 0;
let remainingBalance = 0; // Declare variable to track remaining balance

const addProductToCart = (productId) => {
  const product = products.find(p => p.productId === productId);
  product.quantity++;
  const cartItem = cart.find(item => item.productId === productId);
  if (!cartItem) {
    cart.push(product);
  }
};

const increaseQuantity = (productId) => {
  const product = products.find(p => p.productId === productId);
  if (product) {
    product.quantity++;
  }
};

const decreaseQuantity = (productId) => {
  const product = products.find(p => p.productId === productId);
  if (product && product.quantity > 0) {
    product.quantity--;
    if (product.quantity === 0) {
      const index = cart.findIndex(item => item.productId === productId);
      cart.splice(index, 1);
    }
  }
};

const removeProductFromCart = (productId) => {
  const product = products.find(p => p.productId === productId);
  if (product) {
    product.quantity = 0;
    const index = cart.findIndex(item => item.productId === productId);
    cart.splice(index, 1);
  }
};

const cartTotal = () => {
  return cart.reduce((total, product) => total + product.price * product.quantity, 0);
};

const emptyCart = () => {
  cart.length = 0;
  products.forEach(product => {
    product.quantity = 0;
  });
};

const pay = (amount) => {
  const total = cartTotal();
  totalPaid += amount;
  remainingBalance = totalPaid - total; // Update the remaining balance

  if (remainingBalance >= 0) {
    totalPaid = 0;
    emptyCart();
  }

  return remainingBalance;
};

const resetBalance = () => {
  remainingBalance = 0; // Reset remaining balance
};

const currencyRates = {
  USD: 1,
  EUR: 0.85,
  YEN: 110,
};

let currentCurrency = 'USD';

const convertCurrency = (amount, toCurrency) => {
  return (amount / currencyRates[currentCurrency]) * currencyRates[toCurrency];
};

const switchCurrency = (newCurrency) => {
  if (newCurrency in currencyRates) {
    currentCurrency = newCurrency;
  }
};

const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currentCurrency,
  });
  return formatter.format(amount);
};

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  totalPaid,
  remainingBalance, // Export remaining balance if needed elsewhere
  resetBalance, // Export reset balance function
  currency: {
    convertCurrency,
    switchCurrency,
    currentCurrency,
  },
  formatCurrency
};

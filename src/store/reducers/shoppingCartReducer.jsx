// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const TOGGLE_CART_ITEM = 'TOGGLE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const LOAD_CART = 'LOAD_CART';

// Helper functions
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('shoppingCart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Initial State
const initialState = {
  cart: loadCartFromLocalStorage(),
  isOpen: false
};

// Reducer
const shoppingCartReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case ADD_TO_CART: {
      const existingItemIndex = state.cart.findIndex(
        item => item.product.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, increment count
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          count: updatedCart[existingItemIndex].count + 1
        };
        newState = { ...state, cart: updatedCart };
      } else {
        // New item
        newState = {
          ...state,
          cart: [...state.cart, { product: action.payload, count: 1, checked: true }]
        };
      }
      saveCartToLocalStorage(newState.cart);
      return newState;
    }

    case REMOVE_FROM_CART:
      newState = {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
      saveCartToLocalStorage(newState.cart);
      return newState;

    case UPDATE_CART_ITEM:
      newState = {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, count: action.payload.count }
            : item
        )
      };
      saveCartToLocalStorage(newState.cart);
      return newState;

    case TOGGLE_CART_ITEM:
      newState = {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        )
      };
      saveCartToLocalStorage(newState.cart);
      return newState;

    case CLEAR_CART:
      localStorage.removeItem('shoppingCart');
      return {
        ...state,
        cart: []
      };

    case LOAD_CART:
      return {
        ...state,
        cart: loadCartFromLocalStorage()
      };

    default:
      return state;
  }
};

// Action Creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateCartItem = (productId, count) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, count }
});

export const toggleCartItem = (productId) => ({
  type: TOGGLE_CART_ITEM,
  payload: productId
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const loadCart = () => ({
  type: LOAD_CART
});

// Selectors
export const selectCartItems = (state) => state.shoppingCart.cart || [];

export const selectCartTotal = (state) => {
  const cart = state.shoppingCart.cart || [];
  return cart.reduce((total, item) => {
    return total + (item.product.price * item.count);
  }, 0);
};

export default shoppingCartReducer;
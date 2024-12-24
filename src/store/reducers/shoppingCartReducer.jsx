// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const TOGGLE_CART_ITEM = 'TOGGLE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

// Initial State
const initialState = {
  cart: [],
  isOpen: false  // For dropdown state
};

// Reducer
const shoppingCartReducer = (state = initialState, action) => {
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
        return { ...state, cart: updatedCart };
      } else {
        // New item
        return {
          ...state,
          cart: [...state.cart, { product: action.payload, count: 1, checked: true }]
        };
      }
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };

    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, count: action.payload.count }
            : item
        )
      };

    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        )
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: []
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

export default shoppingCartReducer;
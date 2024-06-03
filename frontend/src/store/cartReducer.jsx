
const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {

        return {
          ...state,
          items: state.items.map((item, index) =>
            index === existingItemIndex
              ? {
                ...item,
                selectedRentalPeriod: action.payload.selectedRentalPeriod,
              }
              : item
          ),
        };
      } else {

        return {
          ...state,
          items: [
            ...state.items,
            { ...action.payload, selectedRentalPeriod: action.payload.selectedRentalPeriod },
          ],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};


export const addToCart = (movie, selectedRentalPeriod) => ({
  type: 'ADD_TO_CART',
  payload: { ...movie, selectedRentalPeriod },
});

export const removeFromCart = (movieId) => ({
  type: 'REMOVE_FROM_CART',
  payload: movieId,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export default cartReducer;
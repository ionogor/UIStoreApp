import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/action";

type Product = {
  id: number;
  title: string;
};
type initialState = {
  cartItems: Product[];
};

const CardReducer = (state: initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          return item.id !== action.payload;
        }),
      };
    default:
      return state;
  }
};

export default CardReducer;

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// action - > function return all object
export const addToCart = (item: any) => {
  return {
    type: ADD_TO_CART,
    payload: item, // if function get any parameter they payload return this object
  };
};

export const removeItem = (id: any) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

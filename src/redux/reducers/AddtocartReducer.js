import {
  ADDTOCARTDATA,
  ADDTOCARTQTYMINUS,
  ADDTOCARTQTYPLUS,
  ADDTOCARTREMOVEDATA,
  SET_CART_TOTAL,
} from "../actionType";

const init = {
  cart: [],
  cartTotal: 0, // <-- added
};
export const addtocartReducer = (state = init, action) => {
  switch (action.type) {
    case ADDTOCARTDATA:
      const updatedCart = state?.cart?.concat(action?.payload);
      const uniqueArray = updatedCart?.reduce((acc, obj) => {
        const existingObj = acc.find((item) => item.id === obj.id);
        if (!existingObj) {
          acc.push(obj);
        }
        return acc;
      }, []);
      return {
        cart: uniqueArray,
      };

    case ADDTOCARTREMOVEDATA:
      return {
        cart: state?.cart?.filter((datafg) => datafg?.id !== action?.payload),
      };

    case ADDTOCARTQTYMINUS:
      return {
        cart: state?.cart?.map((datafg) => {
          if (datafg?.id === action?.payload) {
            return {
              ...datafg,
              qty: datafg?.qty - 1,
            };
          } else {
            return { ...datafg };
          }
        }),
      };

    case ADDTOCARTQTYPLUS:
      return {
        cart: state?.cart?.map((datafg) => {
          if (datafg?.id === action?.payload) {
            return {
              ...datafg,
              qty: datafg?.qty + 1,
            };
          } else {
            return { ...datafg };
          }
        }),
      };
    case SET_CART_TOTAL:
      return {
        ...state,
        cartTotal: action.payload,
      };

    default:
      return state;
  }
};

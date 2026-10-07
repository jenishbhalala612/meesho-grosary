import { BUYNOWDATADETAILS, BUYNOWREMOVE } from "../actionType";

const init = {
  buydata: [],
};
export const buyNowDetailsReducer = (state = init, action) => {
  switch (action.type) {
   case BUYNOWDATADETAILS:
  return {
    ...state,
    buydata: [action.payload],   // this payload already contains checkoutItems
  };

      break;

      case BUYNOWREMOVE:
      return {
        buydata: [],
      };
      break;

    default:
      return state;
      break;
  }
};

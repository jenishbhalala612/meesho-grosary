
import { PRODUCTVIEWDETAILS } from "../actionType";

const init = {
  iddata: '0',
};
export const viewProductDetailsReducer = (state = init, action) => {
  switch (action.type) {
    case PRODUCTVIEWDETAILS:
      return {
        iddata: action.payload,
      };
      break;

    default:
      return state;
      break;
  }
};

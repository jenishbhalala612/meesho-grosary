import { ADDRESSDATADETAILS } from "../actionType";

const init = {
  addressdata: [],
};
export const addressdataDetailsReducer = (state = init, action) => {
  switch (action.type) {
    case ADDRESSDATADETAILS:
      return {
        addressdata: [action.payload],
      };
      break;

    default:
      return state;
      break;
  }
};
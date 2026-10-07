import {combineReducers} from "redux";
import {viewProductDetailsReducer} from "./productviewreducer";
import {buyNowDetailsReducer} from "./BuynowDatareducer";
import {addressdataDetailsReducer} from "./Adressdata.reducer";
import {addtocartReducer} from "./AddtocartReducer";
import paymentReducer from "./PaymentReducer";

export const rootReducer = combineReducers({
  iddata: viewProductDetailsReducer,
  buydata: buyNowDetailsReducer,
  addressdata: addressdataDetailsReducer,
  cart: addtocartReducer,
  payment: paymentReducer,
});

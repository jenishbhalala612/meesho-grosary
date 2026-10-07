import {
  ADDTOCARTDATA,
  ADDTOCARTQTYMINUS,
  ADDTOCARTQTYPLUS,
  ADDTOCARTREMOVEDATA,
  SET_CART_TOTAL,
} from "../actionType";

export const addtocartAction = (data) => (dispatch) => {
  dispatch({ type: ADDTOCARTDATA, payload: data });
};

export const addtocartremoveAction = (id) => (dispatch) => {
  dispatch({ type: ADDTOCARTREMOVEDATA, payload: id });
};

export const addtocartqtyActionPlus = (id) => (dispatch) => {
  dispatch({ type: ADDTOCARTQTYPLUS, payload: id });
};

export const addtocartqtyActionMinus = (id) => (dispatch) => {
  dispatch({ type: ADDTOCARTQTYMINUS, payload: id });
};

export const setCartTotalAction = (total) => (dispatch) => {
  dispatch({ type: SET_CART_TOTAL, payload: total });
};


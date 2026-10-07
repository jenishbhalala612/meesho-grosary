import { BUYNOWDATADETAILS, BUYNOWREMOVE } from "../actionType";

export const BaynowandaddtocartAction = (data) => (dispatch) => {
    dispatch({type:BUYNOWDATADETAILS,payload:data})
};

export const BaynowandRemoveAction = () => (dispatch) => {
    dispatch({type:BUYNOWREMOVE})
};
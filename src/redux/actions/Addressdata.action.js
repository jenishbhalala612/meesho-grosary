import { ADDRESSDATADETAILS } from "../actionType";

export const addressdataAction = (data) => (dispatch) => {
    dispatch({type:ADDRESSDATADETAILS,payload:data})
};
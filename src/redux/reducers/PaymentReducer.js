import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardDetails: {
    cardnumber: '',
    cardname: '',
    month: '',
    year: '',
    cvv: '',
  },
  paymentMode: '',
  upi: '',
  selectUpi: 'phonepee',
  priceTotal: 0,
  isDevice: 'and',
  reselleryesno: 'no',
  upiPaymentToggle: true,
  upiPaymentToggle2: false,
  apiData: [],
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setCardDetails: (state, action) => {
      state.cardDetails = { ...state.cardDetails, ...action.payload };
    },
    setPaymentMode: (state, action) => {
      state.paymentMode = action.payload;
    },
    setUpi: (state, action) => {
      state.upi = action.payload;
    },
    setData: (state, action) => {
      state.upi = action.payload;
    },
    setSelectUpi: (state, action) => {
      state.selectUpi = action.payload;
    },
    setPriceTotal: (state, action) => {
      state.priceTotal = action.payload;
    },
    setIsDevice: (state, action) => {
      state.isDevice = action.payload;
    },
    setResellerYesNo: (state, action) => {
      state.reselleryesno = action.payload;
    },
    setUpiPaymentToggle: (state, action) => {
      state.upiPaymentToggle = action.payload;
    },
    setUpiPaymentToggle2: (state, action) => {
      state.upiPaymentToggle2 = action.payload;
    },
    setApiData: (state, action) => {
      state.apiData = action.payload;
    },
    clearPaymentData: (state) => {
      state.cardDetails = { cardnumber: '', cardname: '', month: '', year: '', cvv: '' };
      state.paymentMode = '';
      state.upi = '';
      state.selectUpi = 'phonepee';
      state.priceTotal = 0;
      state.isDevice = 'and';
      state.reselleryesno = 'no';
      state.upiPaymentToggle = true;
      state.upiPaymentToggle2 = false;
      state.apiData = [];
    },
  },
});

export const {
  setCardDetails,
  setPaymentMode,
  setUpi,
  setData,
  setSelectUpi,
  setPriceTotal,
  setIsDevice,
  setResellerYesNo,
  setUpiPaymentToggle,
  setUpiPaymentToggle2,
  setApiData,
  clearPaymentData,
} = paymentSlice.actions;

export default paymentSlice.reducer;

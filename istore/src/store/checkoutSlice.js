// src/store/checkoutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    addresses: [
      {
        id: 1,
        name: 'John Doe',
        line1: '173 Oxford Rd, Rosebank, Johannesburg',
        line2: 'South Africa',
        phone: '+27794115566',
      },
    ], // ← comma after addresses array
    payments: [
      { id: 1, type: 'Visa',       last4: '1234', expiry: '01/25', name: 'John Doe' },
      { id: 2, type: 'Mastercard', last4: '5678', expiry: '03/26', name: 'John Doe' },
    ],
    selectedAddressId: 1,
    selectedPaymentId: 1,
    orderPlaced: false,
  },
  reducers: {
    addAddress(state, action) {
      const id = Date.now();
      state.addresses.push({ ...action.payload, id });
      state.selectedAddressId = id;
    },
    addPayment(state, action) {
      const id = Date.now();
      state.payments.push({ ...action.payload, id });
      state.selectedPaymentId = id;
    },
    selectAddress(state, action) {
      state.selectedAddressId = action.payload;
    },
    selectPayment(state, action) {
      state.selectedPaymentId = action.payload;
    },
    placeOrder(state) {
      state.orderPlaced = true;
    },
    resetOrder(state) {
      state.orderPlaced = false;
    },
  },
});




export const { addAddress, addPayment, selectAddress, selectPayment, placeOrder, resetOrder } = checkoutSlice.actions
export const selectAddresses    = (s) => s.checkout.addresses
export const selectPayments     = (s) => s.checkout.payments
export const selectSelectedAddr = (s) => s.checkout.addresses.find((a) => a.id === s.checkout.selectedAddressId)
export const selectSelectedPay  = (s) => s.checkout.payments.find((p) => p.id === s.checkout.selectedPaymentId)
export const selectOrderPlaced  = (s) => s.checkout.orderPlaced
export default checkoutSlice.reducer

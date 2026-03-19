import { createSlice } from '@reduxjs/toolkit'

const bagSlice = createSlice({
  name: 'bag',
  initialState: { items: [] },
  reducers: {
    addToBag(state, action) {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        existing.qty += 1
      } else {
        state.items.push({ ...action.payload, qty: 1 })
      }
    },
    removeFromBag(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    updateQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload.id)
      if (item) item.qty = Math.max(1, action.payload.qty)
    },
    clearBag(state) {
      state.items = []
    },
  },
})

export const { addToBag, removeFromBag, updateQty, clearBag } = bagSlice.actions
export const selectBagItems    = (s) => s.bag.items
export const selectBagCount    = (s) => s.bag.items.reduce((a, i) => a + i.qty, 0)
export const selectBagSubtotal = (s) => s.bag.items.reduce((a, i) => a + i.price * i.qty, 0)
export default bagSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import bagReducer      from './bagSlice'
import checkoutReducer from './checkoutSlice'

export default configureStore({
  reducer: {
    products: productsReducer,
    bag:      bagReducer,
    checkout: checkoutReducer,
  },
})

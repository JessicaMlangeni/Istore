import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard  from './pages/Dashboard'
import ItemView   from './pages/ItemView'
import Bag        from './pages/Bag'
import Checkout   from './pages/Checkout'
import AddPayment from './pages/AddPayment'
import AddAddress from './pages/AddAddress'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Dashboard  />} />
        <Route path="/product/:id" element={<ItemView   />} />
        <Route path="/bag"         element={<Bag        />} />
        <Route path="/checkout"    element={<Checkout   />} />
        <Route path="/add-payment" element={<AddPayment />} />
        <Route path="/add-address" element={<AddAddress />} />
      </Routes>
    </BrowserRouter>
  )
}

import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import DashboardLayout from './components/DashboardLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

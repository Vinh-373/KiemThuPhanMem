import { Routes, Route, Navigate } from 'react-router-dom'


import LoginRegister from './pages/LoginRegister'
import Products from './pages/Products'


function App() {

  return (
    <>
      <Routes>
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
    </>
  )
}

export default App

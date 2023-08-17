import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Bankinfo from './pages/Bankinfo';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/bankinfo" element={<Bankinfo />} />
      </Routes>
    </>
  );
}

export default App;

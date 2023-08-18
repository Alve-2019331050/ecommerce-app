import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import ForgotPassword from "./pages/ForgotPassword";
import CreateBankAccount from "./pages/CreateBankAccount";
import UpdateWallet from "./pages/UpdateWallet";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/bankinfo" element={<CreateBankAccount />} />
        <Route path="/updatewallet" element={<UpdateWallet />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;

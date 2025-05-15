import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Contactus from "./pages/Contactus";
import Pagenotfound from "./pages/Pagenotfound";
import Cartpage from "./pages/Cartpage";
import Login from "./pages/auth/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import ForgotPassword from "./pages/auth/Forgotpassword";
import PrivateRoute from "./components/routes/Private";
import AdminRoute from "./components/routes/AdminrRoute";
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';

import Order from './pages/user/Order';
import Profile from './pages/user/Profile'; 
import UpdateProduct from "./pages/admin/UpdateProduct";


function App() {
  return (
    <>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pagenotgound" element={<Pagenotfound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
     
      
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path="user" element={<UserDashboard/>}></Route>
      <Route path="user/orders" element={<Order/>}></Route>
      <Route path="user/profile" element={<Profile/>}></Route> 
      </Route>

      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path="admin" element={<AdminDashboard/>}></Route>
       <Route path="admin/create-category" element={<CreateCategory/>}></Route>
       <Route path="admin/create-product" element={<CreateProduct/>}></Route>
      <Route path="admin/Orders" element={<Orders/>}></Route>
      <Route path="admin/Products" element={<Products/>}></Route>  
      <Route path="admin/product/:slug" element={<UpdateProduct/>}></Route>  
      </Route>
      </Routes>

        </>
  );
}

export default App;

import { Link } from "react-router-dom";
import React from 'react';
import '../../pages/style/Header.css';
import { useAuth } from '../context/Auth';
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { Badge } from "antd";


function Header() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] =useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
    toast.success("logout Successfully");
  }

  return (
    <nav className="navbar navbar-expand-md navabr-dark px-5 bg-transparent shadow bg-image  sticky-top ">
      <div class="container-fluid">
        <Link className="navbar-brand ms-5 text-white fw-bold brand-name" to="/">
          <span class="text-primary">E</span>commerce
        </Link>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
          aria-label="Toggle navigation">
          <i class="fas fa-bars toggler"></i></button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Aboutus">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white " to="/Contactus">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cart-page">
                Cart
              </Link>
            </li>

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (

              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/">
                    {auth?.user?.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>

              </>
            ) }
            <li className="nav-item">
              <Badge count={cart?.length} showZero>
                <Link to="/cart" className="nav-link">Cart</Link>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
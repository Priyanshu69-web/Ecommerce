import React, {
    useState, useEffect, useRef

} from "react";
import Layout from "../components/Layouts/Layout";
import { useCart } from "../components/context/cart";
import { useAuth } from "../components/context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in";
import axios from "axios";
import styles from "./CartPage.module.css";
import toast from "react-hot-toast";
// import braintree from "braintree";const CartPage = () => {
    const CartPage = () => {
        const [auth, setAuth] = useAuth();
        const [cart, setCart] = useCart();
        const [clientToken, setClientToken] = useState("");
        const [instance, setInstance] = useState(null);
        const [loading, setLoading] = useState(false);
        const dropinRef = useRef(null);
        const navigate = useNavigate();
      
        //Total price
        const totalPrice = () => {
          try {
            let total = 0;
            cart?.map((item) => {
              total = total + item.price;
            });
            return total.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
          } catch (error) {
            console.log(error);
          }
        };
      
        //Delete Items
        const removeCartItem = (pid) => {
          try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
          } catch (error) {
            console.log(error);
          }
        };
      
        useEffect(() => {
          if (clientToken && dropinRef.current) {
            DropIn.create(
              {
                authorization: clientToken,
                container: dropinRef.current,
                paypal: { flow: "vault" },
              },
              (err, dropinInstance) => {
                if (err) {
                  console.error("Dropin error:", err);
                  return;
                }
                console.log("DropIn instance created:", dropinInstance);
                setInstance(dropinInstance);
              }
            );
          }
        }, [clientToken]);
      
        useEffect(() => {
          getToken();
        }, [auth?.token]);
      
        const getToken = async () => {
          try {
            const { data } = await axios.get("/api/v1/product/braintree/token");
            setClientToken(data?.clientToken);
          } catch (error) {
            console.log(error);
          }
        };
      
        const handlePayment = async () => {
          try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/api/v1/product/braintree/payment", {
              nonce,
              cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully");
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
      
        return (
          <Layout>
            <div className={`container-fluid py-4 ${styles.cartContainer}`}>
              <div className="row mb-4">
                <div className="col-12">
                  <h1 className={`text-center ${styles.cartHeading}`}>
                    {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
                  </h1>
                  <p className={`text-center ${styles.cartSubHeading}`}>
                    {cart?.length
                      ? `You've ${cart.length} item(s) in your cart ${
                          auth?.token ? "" : "- Please login to checkout!"
                        }`
                      : "Your cart is empty"}
                  </p>
                </div>
              </div>
      
              <div className="row">
                {/* Left - Cart Items */}
                <div className="col-md-7">
                  {cart?.map((p) => (
                    <div className={`row ${styles.cartItem}`} key={p._id}>
                      <div className="col-md-4 d-flex align-items-center">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className={`img-fluid ${styles.productImage}`}
                          alt={p.name}
                        />
                      </div>
                      <div className="col-md-5 d-flex flex-column justify-content-center">
                        <h5 className="mb-1 fw-bold">{p.name}</h5>
                        <p className="mb-2 text-muted">
                          {p.description.substring(0, 50)}...
                        </p>
                        <p className={`mb-0 ${styles.price}`}>$ {p.price}</p>
                      </div>
                      <div className="col-md-3 d-flex align-items-center justify-content-center">
                        <button
                          className={`btn btn-outline-danger ${styles.removeBtn}`}
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
      
                {/* Right - Summary */}
                <div className="col-md-5">
                  <div className={`${styles.cartSummary}`}>
                    <h3 className="mb-3">Cart Summary</h3>
                    <p className={styles.totalLabel}>Total: {totalPrice()}</p>
                    <hr />
                    {auth?.user?.address ? (
                      <div className="mb-3">
                        <h5 className={styles.addressHeading}>Shipping Address:</h5>
                        <p className={styles.address}>{auth?.user?.address}</p>
                        <button
                          className={`btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2 ${styles.addressBtn}`}
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          <i className="bi bi-pencil-square"></i>
                          Update Address
                        </button>
                      </div>
                    ) : (
                      <div className="mb-3">
                        {auth?.token ? (
                          <button
                            className={`btn btn-warning ${styles.addressBtn}`}
                            onClick={() => navigate("/dashboard/user/profile")}
                          >
                            Add Address
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning"
                            onClick={() => navigate("/login", { state: "/cart" })}
                          >
                            Please Login to Checkout
                          </button>
                        )}
                      </div>
                    )}
                    {/* Payment Section */}
                    {clientToken && auth?.token && cart?.length > 0 && (
                      <>
                        <div ref={dropinRef} className="my-4" />
                        <button
                          onClick={handlePayment}
                          className="btn btn-success w-100"
                          disabled={loading || !instance || !auth?.user?.address}
                        >
                          {loading ? "Processing..." : "Make Payment"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        );
      };
      
      export default CartPage;
      
import Layout from "../components/Layouts/Layout";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Radio } from "antd";
import { Prices } from "../components/Price";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./Home.module.css";
import { useCart } from "../components/context/cart";


function Home() {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);


    //Get All Products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //Get Total Count
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (page === 1) return loadMore();
    }, [page]);

    //Load More
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };





    // //  filter by category
    const handleFilter = (Value, id) => {
        let all = [...checked];
        if (Value) {
            all.push(id);

        } else {
            all = all.filter((c) => c !== id);

        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length])
    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //Get Filter Product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };



    return (
    
            <Layout title={"Dashboard - Create Product"}>
              <div className="container-fluid row">
                {/* Sidebar: Stack on mobile, 3 cols on medium+ */}
                {/* Toggle Button - Visible only on mobile */}
                <button
                  className={`btn d-md-none d-flex justify-content-center align-items-center gap-2 ${styles.filterBtn}`}
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#filterOffcanvas"
                  aria-controls="filterOffcanvas"
                >
                  <span>Filter</span>
                  <i className="fa-solid fa-sliders"></i>
                </button>
          
                {/* Offcanvas Filter for Mobile View */}
                <div
                  className="offcanvas offcanvas-start"
                  tabIndex="-1"
                  id="filterOffcanvas"
                  aria-labelledby="filterOffcanvasLabel"
                  style={{ width: "75vw" }}
                >
                  <div className="offcanvas-header">
                    <h5 id="filterOffcanvasLabel">Filters</h5>
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className={`offcanvas-body m-0 ${styles.filter}`}>
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                      {categories?.map((c) => (
                        <Checkbox
                          key={c._id}
                          onChange={(e) => handleFilter(e.target.checked, c._id)}
                        >
                          <span className={styles.category}>{c.name}</span>
                        </Checkbox>
                      ))}
                    </div>
          
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="d-flex flex-column">
                      <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                        {Prices?.map((p) => (
                          <div key={p._id}>
                            <Radio value={p.array}>{p.name}</Radio>
                          </div>
                        ))}
                      </Radio.Group>
                    </div>
          
                    <div className="d-flex flex-column mt-3">
                      <Button
                        className={`btn ${styles.reset}`}
                        onClick={() => window.location.reload()}
                      >
                        Reset Filter
                      </Button>
                    </div>
                  </div>
                </div>
          
                {/* Always-visible Sidebar Filter for Desktop View (md and up) */}
                <div className={`d-none d-md-block mt-0 col-md-3 ${styles.filter}`}>
                  <h4 className="text-center">Filter By Category</h4>
                  <div className="d-flex flex-column">
                    {categories?.map((c) => (
                      <Checkbox
                        key={c._id}
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    ))}
                  </div>
          
                  <h4 className="text-center mt-4">Filter By Price</h4>
                  <div className="d-flex flex-column">
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                      {Prices?.map((p) => (
                        <div key={p._id}>
                          <Radio value={p.array}>{p.name}</Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  </div>
          
                  <div className="d-flex flex-column mt-3">
                    <Button
                      className={`btn ${styles.reset}`}
                      onClick={() => window.location.reload()}
                    >
                      Reset Filter
                    </Button>
                  </div>
                </div>
          
                {/* Products section */}
                <div className={`col-12 col-md-9 ${styles.products}`}>
                  <h1 className={styles.heading}>Explore All Our Products</h1>
                  <div className="row g-3">
                    {products?.map((p) => (
                      <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p._id}>
                        <div className={`card ${styles.card}`}>
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className={`card-img-top ${styles.cardImg}`}
                            alt={p.name}
                          />
                          <div className={`card-body d-flex flex-column ${styles.cardBody}`}>
                            <div className="mb-2">
                              <h5 className={`card-title ${styles.cardTitle}`}>{p.name}</h5>
                              <h5 className={`card-title card-price ${styles.price}`}>
                                {p.price.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </h5>
                            </div>
                            <p className={`card-text ${styles.cardText}`}>
                              {p.description.substring(0, 60)}...
                            </p>
                            <div className="d-flex flex-wrap justify-content-between">
                              <button
                                className={styles.details}
                                onClick={() => navigate(`/product/${p.slug}`)}
                              >
                                More Details
                              </button>
                              <button
                                className={styles.cartButton}
                                onClick={() => {
                                  setCart([...cart, p]);
                                  localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                  toast.success("Item Added to Cart");
                                }}
                              >
                                Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
          
                  {/* Load More */}
                  {/* <div className="text-center m-3">
                    {products && products.length < total && (
                      <button
                        className="btn btn-outline-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page + 1);
                        }}
                      >
                        {loading ? "Loading..." : "Load More"}
                      </button>
                    )}
                  </div> */}
                </div>
              </div>
            </Layout>
          );
           
    
};

export default Home;










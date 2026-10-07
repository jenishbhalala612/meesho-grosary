import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ShowHeader from "./components/ShowHeader";
import Loading from "./components/Loading";
import UPIPayment from "./components/UPIPayment";
import BottomNav from "./components/BottomNav";

function App() {
  const location = useLocation();

  const HomePage = lazy(() => import("./components/HomePage"));
  const Productpage = lazy(() => import("./components/Productpage"));
  const CategoryPage = lazy(() => import("./components/CategoryPage"));
  const AddAddresspage = lazy(() => import("./components/AddAddresspage"));
  const CheckOutpage = lazy(() => import("./components/CheckOutpage"));
  const PaymentPage = lazy(() => import("./components/PaymentPage"));
  const Cartpage = lazy(() => import("./components/Cartpage"));
  const OrderThankYou = lazy(() => import("./components/OrderThankYou"));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================================
     LOAD PRODUCTS
  ========================================= */

  useEffect(() => {
    fetch("/products.json")
      .then((r) => r.json())
      .then((productdata) => {
        setData(
          productdata.map((d) => ({
            ...d,
            rate: (Math.random() * 1.5 + 3.5).toFixed(1),
            ratenum: Math.floor(Math.random() * 99901 + 100),
          }))
        );

        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  /* =========================================
     DISABLE RIGHT CLICK / DEV SHORTCUTS
  ========================================= */

  useEffect(() => {
    const h = (e) => {
      if (
        e.keyCode === 123 ||
        (e.ctrlKey &&
          e.shiftKey &&
          ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
      }
    };

    const c = (e) => {
      e.preventDefault();
    };

    document.addEventListener("keydown", h);
    document.addEventListener("contextmenu", c);

    return () => {
      document.removeEventListener("keydown", h);
      document.removeEventListener("contextmenu", c);
    };
  }, []);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* =========================================
          ROUTES
      ========================================= */}

      <Routes>
        {/* =========================================
            HEADER ROUTES
        ========================================= */}

        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <ShowHeader />
            </Suspense>
          }
        >
          {/* HOME */}

          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <HomePage data={data} />
              </Suspense>
            }
          />

          {/* CATEGORY */}

          <Route
            path="category/:category"
            element={
              <Suspense fallback={<Loading />}>
                <CategoryPage data={data} />
              </Suspense>
            }
          />

          {/* PRODUCT */}

          <Route
            path="productdetails/:id/:name"
            element={
              <Suspense fallback={<Loading />}>
                <Productpage data={data} />
              </Suspense>
            }
          />

          {/* ADDRESS */}

          <Route
            path="addaddress"
            element={
              <Suspense fallback={<Loading />}>
                <AddAddresspage />
              </Suspense>
            }
          />
        </Route>

        {/* =========================================
            CART
        ========================================= */}

        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loading />}>
              <Cartpage data={data} />
            </Suspense>
          }
        />

        {/* =========================================
            CHECKOUT
        ========================================= */}

        <Route
          path="/checkout"
          element={
            <Suspense fallback={<Loading />}>
              <CheckOutpage data={data} />
            </Suspense>
          }
        />

        {/* =========================================
            PAYMENT
        ========================================= */}

        <Route
          path="/payment"
          element={
            <Suspense fallback={<Loading />}>
              <PaymentPage data={data} />
            </Suspense>
          }
        />

        {/* =========================================
            UPI
        ========================================= */}

        <Route
          path="/upi"
          element={
            <Suspense fallback={<Loading />}>
              <UPIPayment data={data} />
            </Suspense>
          }
        />

        {/* =========================================
            THANK YOU
        ========================================= */}

        <Route
          path="/thank-you"
          element={
            <Suspense fallback={<Loading />}>
              <OrderThankYou />
            </Suspense>
          }
        />
      </Routes>

      {/* =========================================
          BOTTOM NAV - ONLY HOME PAGE
      ========================================= */}

      {location.pathname === "/" && <BottomNav />}

      {/* =========================================
          TOAST
      ========================================= */}

      <ToastContainer
        className={
          location.pathname === "/"
            ? "!bottom-[80px]"
            : "!bottom-[20px]"
        }
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
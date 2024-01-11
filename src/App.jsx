import React from "react";
import {
  Cart,
  FlexContent,
  Footer,
  Hero,
  Navbar,
  Sales,
  PopularSales,
  Stories,
} from "./components";
import {
  heroapi,
  popularsales,
  allproducts,
  highlight,
  sneaker,
  story,
  footerAPI,
} from "./data/data.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import Checkout from "./components/Checkout.jsx";
import { useSelector } from "react-redux";
import { selectCartItems } from "./app/CartSlice.js";

const App = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route
          path="/allProduct"
          element={
            <>
              <Navbar />
              <Cart />
              <main className="flex flex-col gap-16 relative">
                <Sales endpoint={allproducts} ifExists />
              </main>
              <Footer footerAPI={footerAPI} />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            cartItems.length > 0 && (
              <>
                <Navbar />
                <main className="flex flex-col gap-16 relative">
                  <Checkout />
                </main>
                <Footer footerAPI={footerAPI} />
              </>
            )
          }
        />
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Cart />
              <main className="flex flex-col gap-16 relative">
                <Hero heroapi={heroapi} />
                <FlexContent endpoint={highlight} ifExists />
                <PopularSales endpoint={popularsales} ifExists />
                <FlexContent endpoint={sneaker} />
                <Stories story={story} />
              </main>
              <Footer footerAPI={footerAPI} />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home";
import ProductDetails from "./components/ProductDetails";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import Cart from "./Pages/Cart";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;

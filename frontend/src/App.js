import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register"
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="conatiner container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/search/:keyword" component={Home} /> */}

            {/* <Route path="/product/:id" component={ProductDetails} exact /> */}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

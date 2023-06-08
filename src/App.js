import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import AddCoupon from "./pages/AddCoupon";
import Couponlist from "./pages/Couponlist";

function App() {
    return (
        <Router>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/reset-password" element={<Resetpassword />} />
                    <Route
                        path="/forgot-password"
                        element={<Forgotpassword />}
                    />
                    <Route path="/admin" element={<MainLayout />}>
                        {/* Nested routes for the MainLayout component */}
                        <Route index element={<Dashboard />} />
                        {/* Add your other nested routes here */}
                        <Route path="enquiries" element={<Enquiries />} />
                        <Route path="blog-list" element={<Bloglist />} />
                        <Route
                            path="blog-category-list"
                            element={<Blogcatlist />}
                        />
                        <Route path="blog-category" element={<Addblogcat />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="list-color" element={<Colorlist />} />
                        <Route
                            path="list-category"
                            element={<Categorylist />}
                        />
                        <Route path="list-brand" element={<Brandlist />} />
                        <Route path="list-product" element={<Productlist />} />
                        <Route path="blog" element={<Addblog />} />
                        <Route path="color" element={<Addcolor />} />
                        <Route path="category" element={<Addcat />} />
                        <Route path="brand" element={<Addbrand />} />
                        <Route path="product" element={<Addproduct />} />
                        <Route path="coupon" element={<AddCoupon />} />
                        <Route path="coupon-list" element={<Couponlist />} />
                    </Route>
                </Routes>
            </Provider>
        </Router>
    );
}

export default App;

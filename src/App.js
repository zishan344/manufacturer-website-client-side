import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./component/DashBoard/AddProduct";
import AddReview from "./component/DashBoard/AddReview";
import DashBoard from "./component/DashBoard/DashBoard";
import MakeAdmin from "./component/DashBoard/MakeAdmin";
import ManageOrder from "./component/DashBoard/ManageOrder";
import ManageProducts from "./component/DashBoard/ManageProducts";
import MyOrder from "./component/DashBoard/MyOrder";
import MyProfile from "./component/DashBoard/MyProfile";
import Login from "./component/Pages/Accoutns/Login";
import Register from "./component/Pages/Accoutns/Register";
import Blog from "./component/Pages/Blogs/Blog";
import AllReviews from "./component/Pages/Home/AllReviews";
import Home from "./component/Pages/Home/Home";
import MoreServices from "./component/Pages/Home/MoreServices";
import ProductDetils from "./component/Pages/Home/ProductDetils";
import Portfolio from "./component/Pages/PortFolio/Portfolio";
import Footer from "./component/Shared/Footer";
import Navbar from "./component/Shared/Navbar";
import NotFound from "./component/Shared/NotFound";
import RequarAuth from "./component/Shared/RequarAuth";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/allProduct" element={<MoreServices />}></Route>
        <Route path="/allReviews" element={<AllReviews />}></Route>
        <Route
          path="/portfolio"
          element={
            <RequarAuth>
              <Portfolio />
            </RequarAuth>
          }
        ></Route>
        <Route
          path="/productDetils/:id"
          element={
            <RequarAuth>
              <ProductDetils />
            </RequarAuth>
          }
        ></Route>

        <Route path="/blog" element={<Blog />}></Route>
        <Route
          path="/dashboard"
          element={
            <RequarAuth>
              <DashBoard />
            </RequarAuth>
          }
        >
          <Route index element={<MyProfile />} />
          <Route path="/dashboard/myOrder" element={<MyOrder />} />
          <Route path="/dashboard/addReview" element={<AddReview />} />
          <Route path="/dashboard/manageAllOrder" element={<ManageOrder />} />
          <Route path="/dashboard/addProduct" element={<AddProduct />} />
          <Route path="/dashboard/makeAdmin" element={<MakeAdmin />} />
          <Route path="/dashboard/manageProduct" element={<ManageProducts />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;

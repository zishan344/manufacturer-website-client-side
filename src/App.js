import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./component/DashBoard/DashBoard";
import Login from "./component/Pages/Accoutns/Login";
import Register from "./component/Pages/Accoutns/Register";
import Blog from "./component/Pages/Blogs/Blog";
import Home from "./component/Pages/Home/Home";
import ProductDetils from "./component/Pages/Home/ProductDetils";
import MyProfile from "./component/Pages/MyProfile/MyProfile";
import Footer from "./component/Shared/Footer";
import Navbar from "./component/Shared/Navbar";
import NotFound from "./component/Shared/NotFound";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/productDetils/:id" element={<ProductDetils />}></Route>
        <Route path="/profile" element={<MyProfile />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
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

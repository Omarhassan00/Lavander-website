import { Route, Routes , Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import PlogsPage from "./pages/PlogsPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import Product_page from "./pages/Product_page"
import LoadingSpinner from "./components/LoadingSpinner";

import { useUserStore } from "./stores/useUserStore";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollToTopButton from "./components/ScrollToTopButton"

import Profile from "./pages/Profile";
import History from "./pages/History";
import LavantgenderPage from "./pages/LavantgenderPage";
import Lavandgenderpage from "./pages/Lavandgenderpage";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";

function App() {
  const location = useLocation ();
    const { user, checkAuth ,checkingAuth } = useUserStore();
    const { getCartItems } = useCartStore();
    const {pathname} = useLocation();
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);
    
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      
      if (!user) return;
      
      getCartItems();
    }, [getCartItems, user, pathname]);
    if (checkingAuth) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-white text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(128,0,255,0.5)_0%,rgba(207,163,255,0.36)_45%,rgba(255,255,255,0.57)_100%)]" />
        </div>
      </div>
      <div className="relative z-50 ">
      {location.pathname !== '/' && <Navbar />}
        
      <ScrollToTopButton/>
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/home' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/home' />} />
					<Route path='/ForgotPassword' element={!user ? <ForgotPassword /> : <Navigate to='/home' />} />
					<Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
          <Route path="/" element={<LandingPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Plogs" element={<PlogsPage />} />
          <Route path="/Profile" element={user ? <Profile /> : <Navigate to='/' />} />
          <Route path="/History" element={user ? <History /> : <Navigate to='/' />} />
					<Route path='/Product_page' element={<Product_page />} />	
          <Route path='/category/:category' element={<CategoryPage />} />
					<Route path='/Lavant/:gender' element={<LavantgenderPage />} />
          <Route path='/Lavand/:gender' element={<Lavandgenderpage />} />
          <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
        </Routes>
      </div>
      <Toaster />
      {location.pathname !== '/' && <Footer />}

    </div>
  );
}
export default App;

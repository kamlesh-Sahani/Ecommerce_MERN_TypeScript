import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

const Header = lazy(() => import("./Components/Header"));
const Home = lazy(() => import("./Components/Home"));
const Cart = lazy(() => import("./Components/Cart"));
const Shipping = lazy(() => import("./Components/Shipping"));
const Login = lazy(() => import("./Components/Login"));
const Search = lazy(() => import("./Components/Search"));
import "./Styles/app.scss";
import Loader from "./Components/Loader";
import Register from "./Components/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetUser } from "./Redux/Slices/Users/user";
import { AppDispatch, RootType } from "./Redux/Store";
import ProtectedRoutes from "./Components/Protected-Routes";
const App = () => {
  const { user, loading } = useSelector((state: RootType) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch(fetchGetUser(user.uid));    
      }
    });
  }, [

  ]);
  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Header user={user?user.user:null} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />

          <Route path="/login" element={<ProtectedRoutes isAuthentication={user?false:true}><Login /></ProtectedRoutes> } />
          <Route path="/register" element={<ProtectedRoutes isAuthentication={user?false:true}><Register /></ProtectedRoutes>} />


          <Route path="/cart" element={ <ProtectedRoutes isAuthentication={user?true:false}><Cart /></ProtectedRoutes>} />
          <Route path="/shipping" element={<ProtectedRoutes isAuthentication={user?true:false}><Shipping /></ProtectedRoutes>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

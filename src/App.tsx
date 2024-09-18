import { useEffect, useContext } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

import MainPage from "./pages/MainPage"
import CreateProfile from "./pages/CreateProfile"

import Header from "./components/Header"

import MyContext from "./MyContext"

const App: React.FC = () => {
  const navigate = useNavigate();

  const context = useContext(MyContext);
  console.log (context);
  const { user, cart, setCart } = context;
  console.log("User in App:", user);
  console.log("Cart in App:", cart);
  console.log("SetCart in App:", setCart);
  
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>IdeaHub Project</title>
      </Helmet>

      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
      </Routes>
    </>
  );
}

export default App

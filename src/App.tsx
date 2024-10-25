import { useEffect, useContext } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

import MainPage from "./pages/MainPage"
import CreateProfile from "./pages/CreateProfile"
import CartPage from "./pages/CartPage"

import MyContext from "./MyContext"

const App: React.FC = () => {
  const navigate = useNavigate();

  const context = useContext(MyContext);
  const { user } = context;
  
  useEffect(() => {
    if (!user){
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title>IdeaHub Project</title>
      </Helmet>

      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
      </Routes>
    </>
  );
}

export default App

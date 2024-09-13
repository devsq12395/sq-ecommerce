import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

import MainPage from "./pages/MainPage"
import CreateProfile from "./pages/CreateProfile"

import Header from "./components/Header"

const App: React.FC = () => {
  const navigate = useNavigate();
  
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

import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

import MainPage from "./pages/MainPage"
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
      </Routes>
    </>
  );
}

export default App

import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Landing from "./components/landing/landing";
import Form from "./components/login/form";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import Nav from "./components/nav/nav";
import Search from "./components/search/search";
import New from "./components/new/new";
import Sidebar from "./components/sidebar/sidebar";
import About from "./components/aboutme/aboutme";
import Register from "./components/register/register";
import Fotter from "./components/fotter/fotter";
import Favorites from "./components/favorites/favorites";
import { UserProvider } from "./UserContext";

function App() {
  const { pathname } = useLocation();

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const exceps =
    pathname !== "/" && pathname !== "/login" && pathname !== "/register";

  return (
    <div className="App">
      {exceps && (
        <div className="app-container">
          <Nav showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
          <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        </div>
      )}
      <UserProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Form />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/new" element={<New />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </UserProvider>

      {exceps && (
        <div className="app-container">
          <Fotter />
        </div>
      )}
    </div>
  );
}

export default App;

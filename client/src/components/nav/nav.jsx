import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import { FaTimes, FaBars } from "react-icons/fa";
import Icon from "../../resources/videojuego-icon.png";

const Nav = ({ showSidebar, toggleSidebar }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // Esta función se ejecuta cada vez que el contenido del input de búsqueda cambia
  const handlechange = (event) => {
    navigate(`/search?name=${name}`);
    setName(event.target.value);
  };

  // Esta función se ejecuta cuando el usuario hace clic en el botón de búsqueda
  const handlesearch = () => {
    navigate(`/search?name=${name}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-icon" onClick={toggleSidebar}>
        {showSidebar ? <FaTimes /> : <FaBars />}
      </div>

      <div className="search">
        <input type="search" onChange={handlechange} value={name} />
        <button onClick={handlesearch}>SEARCH</button>
      </div>

      <Link to={"/Home"}>
        <img src={Icon} alt="Icon" />
      </Link>
    </nav>
  );
};

export default Nav;

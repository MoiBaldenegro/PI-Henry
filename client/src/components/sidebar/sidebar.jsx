import "./sidebar.css";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  const handlelogout = () => {};

  return (
    <div className={`sidebar ${showSidebar ? "active" : ""}`}>
      <div className="sidebar-content">
        <button className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
        </button>
        <Link to={"/new"}>
          <p>CREATE GAME</p>
        </Link>
        <Link to={"/Favorites"}>
          <p>FAVORITES</p>
        </Link>
        <Link to={"/About"}>
          <p>ABOUT ME</p>
        </Link>
      </div>
      <div onClick={handlelogout} className="logout">
        <Link to={"/"}>
          <p>LOG OUT</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

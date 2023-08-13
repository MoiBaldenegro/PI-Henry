import { Link } from "react-router-dom";
import "./landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <Link to="/login">
        <p>LET'S START</p>
      </Link>
    </div>
  );
};

export default Landing;

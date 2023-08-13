import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registervalidation from "./registervalidation";
import Icon from "../../resources/videojuego-icon.png";
import "./register.css";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  // Estado para almacenar los valores de los campos de registro
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Estado para almacenar los mensajes de error correspondientes a cada campo de registro
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Función que se ejecuta cada vez que se cambia el valor de un campo de registro
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });

    registervalidation({ ...form, [name]: value }, errors, setErrors);
  };

  // Función que se ejecuta cuando se envía el formulario de registro
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/videogames/register", form);

      alert("User created successfully");

      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="formulario-container">
      <form onSubmit={handleSubmit}>
        <img src={Icon} alt="Icon" />
        <label htmlFor="email">EMAIL: </label>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}

        <label htmlFor="password">PASSWORD: </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}

        <label htmlFor="confirmPassword">CONFIRM PASSWORD: </label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <button type="submit">REGISTER</button>

        <span>already have an account? </span>
        <span className="login">
          <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;

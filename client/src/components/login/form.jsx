import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import formvalidation from "./formvalidation";
import Icon from "../../resources/videojuego-icon.png";
import "./form.css";
import { useUserContext } from "../../UserContext";

const Form = () => {
  const { login } = useUserContext();

  const navigate = useNavigate();

  // Estado para almacenar los valores de los campos de 'email' y 'password'
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Estado para almacenar los mensajes de error correspondientes a cada campo
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Función que se ejecuta cada vez que se cambia el valor de un campo
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });

    // Validación por campo: Se llama a la función 'validation' para validar el campo modificado
    formvalidation({ ...form, [name]: value }, errors, setErrors);
  };

  const [access, setAccess] = useState(false);

  const [loginn, setLoginn] = useState("");

  useEffect(() => {
    !access && navigate("/login");
  }, [access, navigate]);

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginResult = await login(form);

    setAccess(loginResult.access);
    setLoginn(loginResult.access ? "" : "Invalid email or password");
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

        <button type="submit">LOGIN</button>
        {loginn && <p>{loginn}</p>}

        <span>not acount yet? </span>
        <span className="register">
          <Link to={"/register"}>REGISTER</Link>
        </span>
      </form>
    </div>
  );
};

export default Form;

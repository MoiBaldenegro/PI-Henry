import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getgenres } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import newvalidation from "./newvalidation";
import axios from "axios";
import "./new.css";

const New = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener el estado de los generos desde Redux
  const genres = useSelector((state) => state.genres);

  // Efecto para obtener los generos cuando el componente se monta o actualiza
  useEffect(() => {
    dispatch(getgenres());
  }, [dispatch]);

  // Estado para almacenar los valores de los campos
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    platforms: "",
    releasedate: "",
    rating: "",
    genres: [],
  });

  // Estado para almacenar los mensajes de error correspondientes a cada campo
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    description: "",
    platforms: "",
    releasedate: "",
    rating: "",
    genres: "",
  });

  // Función que se ejecuta cada vez que se cambia el valor de un campo
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });

    // Validación por campo: Se llama a la función 'validation' para validar el campo modificado
    newvalidation({ ...form, [name]: value }, errors, setErrors);
  };

  // Función que se ejecuta cuando se cambia el estado de un género con el checkbox
  const handleGenreChange = (event) => {
    const genreName = event.target.value;
    const isChecked = event.target.checked;

    let updatedGenres;

    // Si el checkbox está seleccionado, agregamos el género a la lista de géneros seleccionados
    if (isChecked) {
      updatedGenres = [...form.genres, genreName];
    } else {
      updatedGenres = form.genres.filter((genre) => genre !== genreName);
    }

    setForm({ ...form, genres: updatedGenres });

    // Validación por campo: Se llama a la función 'newvalidation' para validar los géneros seleccionados
    newvalidation({ ...form, genres: updatedGenres }, errors, setErrors);

    // Validación adicional para verificar que al menos un género esté seleccionado
    const hasSelectedGenre = updatedGenres.length > 0;
    if (!hasSelectedGenre) {
      setErrors((errors) => ({
        ...errors,
        genres: "Por favor selecciona al menos un género",
      }));
    } else {
      setErrors((errors) => ({ ...errors, genres: "" }));
    }

    console.log(updatedGenres);
  };

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/videogames",
        form
      );
      alert("Videogame created successfully");

      // Navegar a la ruta "/detail" del videojuego creado después de enviar el formulario
      navigate(`/detail/${response.data.id}`);
    } catch (error) {
      alert("Error en la solicitud");
    }
  };

  return (
    <div className="form-general">
      <div className="page-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-left">
            <h1 for="nombre">CREATE A NEW VIDEOGAME</h1>
            <label for="nombre">NAME:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p>{errors.name}</p>}
            <label for="image">IMAGE (URL):</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
            />
            {errors.image && <p>{errors.image}</p>}

            <label for="platforms">PLATFORMS:</label>
            <input
              type="text"
              name="platforms"
              value={form.platforms}
              onChange={handleChange}
              required
            />
            {errors.platforms && <p>{errors.platforms}</p>}

            <label for="releasedate">RELEASE DATE:</label>
            <input
              type="date"
              name="releasedate"
              value={form.releasedate}
              onChange={handleChange}
              required
            />
            {errors.releasedate && <p>{errors.releasedate}</p>}

            <label for="rating">RATING:</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={handleChange}
              required
            />
            {errors.rating && <p>{errors.rating}</p>}
          </div>

          <div className="form-right">
            <label for="description">DESCRIPTION:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
            {errors.description && <p>{errors.description}</p>}
            <fieldset>
              <legend>GENRES: </legend>
              {genres.map((genre) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      name={genre.name}
                      value={genre.name}
                      checked={form.genres.includes(genre.name)}
                      onChange={handleGenreChange}
                    />
                    <span name={genre.name}>{genre.name}</span>
                  </div>
                );
              })}
            </fieldset>
            {errors.genres && <p>{errors.genres}</p>}
            <button type="submit">CREATE VIDEOGAME</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default New;

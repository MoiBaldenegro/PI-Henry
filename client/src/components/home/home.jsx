import Cards from "../cards/cards";
import { useUserContext } from "../../UserContext";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getgenres } from "../../redux/actions";
import { useState } from "react";
import "./home.css";

const Home = () => {
  const { userid } = useUserContext();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  // Definir estados para los filtros y opciones de clasificación
  const [sortOption, setSortOption] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showGenreMenu, setShowGenreMenu] = useState(false);

  useEffect(() => {
    dispatch(getgenres());
  }, [dispatch]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleOriginChange = (event) => {
    setSelectedOrigin(event.target.value);
  };

  const handleGenreChange = (event) => {
    const genreName = event.target.value;
    if (selectedGenres.includes(genreName)) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== genreName));
    } else {
      setSelectedGenres([...selectedGenres, genreName]);
    }
  };

  // Función para resetear los filtros y opciones de clasificación
  const resetFilters = () => {
    setSortOption("");
    setSelectedGenres([]);
    setSelectedOrigin("");
  };

  return (
    <div className="home-container">
      <div className="options-container">
        <button className="reset-button" onClick={resetFilters}>
          CLEAR FILTERS
        </button>

        <div className="sort-container">
          <select
            className="sort-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="" selected>
              SORT BY:
            </option>
            <option value="1">Name: A - Z</option>
            <option value="2">Name: Z - A</option>
            <option value="3">Rating: 5 - 0</option>
            <option value="4">Rating: 0 - 5</option>
          </select>
        </div>

        <div className="filter-container">
          <div className="genres-container">
            <button
              className="genre-menu-button"
              onClick={() => setShowGenreMenu(!showGenreMenu)}
            >
              SELECT GENRES
            </button>

            {showGenreMenu && (
              <div className="genre-menu">
                {genres.map((genre) => (
                  <div key={genre.id}>
                    <input
                      type="checkbox"
                      value={genre.name}
                      checked={selectedGenres.includes(genre.name)}
                      onChange={handleGenreChange}
                    />
                    <label>{genre.name}</label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="origin-container">
            <select
              className="origin-select"
              value={selectedOrigin}
              onChange={handleOriginChange}
            >
              <option value="" selected>
                ORIGIN:
              </option>
              <option value="1">API</option>
              <option value="2">DB</option>
            </select>
          </div>
        </div>
      </div>

      <Cards
        userid={userid}
        sortOption={sortOption}
        selectedGenres={selectedGenres}
        selectedOrigin={selectedOrigin}
      />
    </div>
  );
};

export default Home;

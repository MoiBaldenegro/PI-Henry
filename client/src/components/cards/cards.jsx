import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getvideogames } from "../../redux/actions";
import Card from "../card/card";
import { getfavorites } from "../../redux/actions";
import Loader from "../loader/loader";

import "./cards.css";

const Cards = ({ userid, sortOption, selectedGenres, selectedOrigin }) => {
  const dispatch = useDispatch();

  // Obtener el estado de los videojuegos desde Redux
  const videogames = useSelector((state) => state.videogames);
  const myfavorites = useSelector((state) => state.myfavorites);
  const [isLoading, setIsLoading] = useState(true);

  // Efecto para obtener los videojuegos cuando el componente se monta o actualiza
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getvideogames()),
        dispatch(getfavorites(userid)),
      ]);
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch, userid]);

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const itemspage = 15;
  const ilastone = currentPage * itemspage;
  const ifirstone = ilastone - itemspage;

  //Filtros y Ordenamientos
  const filteredVideogames = videogames.filter((videogame) => {
    const matchesSelectedGenres =
      selectedGenres.length === 0 ||
      selectedGenres.every((genre) => videogame.genres.includes(genre));

    const matchesSelectedOrigin =
      selectedOrigin === "" ||
      (selectedOrigin === "1" && typeof videogame.id === "number") || // API
      (selectedOrigin === "2" && typeof videogame.id === "string"); // DB

    return matchesSelectedGenres && matchesSelectedOrigin;
  });

  const sortedVideogames = [...filteredVideogames];

  if (sortOption === "1") {
    sortedVideogames.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "2") {
    sortedVideogames.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "3") {
    sortedVideogames.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === "4") {
    sortedVideogames.sort((a, b) => a.rating - b.rating);
  }

  const currentItems = sortedVideogames.slice(ifirstone, ilastone);

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="cards-container">
          <div className="cards">
            {currentItems.map((videogame) => {
              return (
                <Card
                  key={videogame.id}
                  id={videogame.id}
                  userid={userid}
                  name={videogame.name}
                  releasedate={videogame.releasedate}
                  rating={videogame.rating}
                  platforms={videogame.platforms}
                  image={videogame.image}
                  myfavorites={myfavorites}
                />
              );
            })}
          </div>
          <div className="buttons-container">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              Anterior
            </button>
            <button
              disabled={ilastone >= sortedVideogames.length}
              onClick={() => {
                setCurrentPage(currentPage + 1);
                window.scrollTo(0, 0);
              }}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getvideogamesname } from "../../redux/actions";
import Card from "../card/card";
import { useLocation } from "react-router-dom";
import "../cards/cards.css";
import { useUserContext } from "../../UserContext";

const Search = () => {
  const dispatch = useDispatch();

  const { userid } = useUserContext();

  // Obtener el estado de los videojuegos desde Redux
  const videogames = useSelector((state) => state.videogames);

  // Obtener la información de la URL utilizando el hook useLocation
  const queryParams = new URLSearchParams(useLocation().search); // /search?arriba=asdasd

  // Obtener el valor del parámetro "name" de la URL
  const name = queryParams.get("name");

  // Efecto para obtener los videojuegos filtrados cuando el valor del parámetro "name" cambia o cuando se monta o actualiza el componente
  useEffect(() => {
    dispatch(getvideogamesname(name));
  }, [name, dispatch]);

  return (
    <div className="cards-container">
      <div className="cards">
        {videogames.map((videogame) => {
          return (
            <Card
              key={videogame.id}
              id={videogame.id}
              name={videogame.name}
              releasedate={videogame.releasedate}
              rating={videogame.rating}
              platforms={videogame.platforms}
              image={videogame.image}
              userid={userid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;

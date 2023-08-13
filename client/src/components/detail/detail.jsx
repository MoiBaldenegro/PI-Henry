import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getvideogamedetail, cleandetail } from "../../redux/actions";
import "./detail.css";
import pcIcon from "../../resources/icons/pc-icon.png";
import psIcon from "../../resources/icons/ps-icon.png";
import xboxIcon from "../../resources/icons/xbox-icon.png";
import nintendoIcon from "../../resources/icons/nintendo-icon.png";
import androidIcon from "../../resources/icons/android-icon.png";
import defaultimage from "../../resources/no-image.jpg";
import Loader from "../loader/loader";

const Detail = () => {
  const dispatch = useDispatch();

  // Obtener el detalle del videojuego desde el estado de Redux
  const videogamedetail = useSelector((state) => state.videogamedetail);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener el parámetro "id" de la URL utilizando el hook useParams
  const { id } = useParams();
  // Efecto para obtener los detalles del videojuego cuando el componente se monta o cuando el parámetro "id" cambia
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(getvideogamedetail(id))]);
    };
    setTimeout(() => {
      setIsLoading(false);
    }, 800);

    fetchData();
    // Limpiar los detalles del videojuego al desmontar el componente para evitar visualizar información incorrecta en futuras vistas
    return () => dispatch(cleandetail());
  }, [id, dispatch]);

  const processDescription = (description) => {
    if (!description) {
      return null;
    }

    let processedDescription = description;

    const espanolIndex = description.indexOf("Español");

    if (espanolIndex !== -1) {
      processedDescription = description.substring(0, espanolIndex);
    }

    // Eliminar las etiquetas <p> y <br>
    processedDescription = processedDescription
      .replace(/<\/?p>/g, "")
      .replace(/<br ?\/?>/g, "\n")
      .replace(/<\/?h1>/g, "")
      .replace(/<\/?h2>/g, "")
      .replace(/<\/?ul>/g, "")
      .replace(/<\/?li>/g, "")
      .replace(/<\/?em>/g, "");

    const paragraphs = processedDescription.split("\n");

    return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);
  };

  const renderStars = () => {
    const maxRating = 5;
    const filledStars = Math.floor(videogamedetail.rating);
    const hasHalfStar = videogamedetail.rating % 1 !== 0;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      let starClass = "star";

      starClass += i <= videogamedetail.rating ? " filled" : "";

      if (i === filledStars + 1 && hasHalfStar) {
        starClass += " half-filled";
      }

      stars.push(
        <span key={i} className={starClass}>
          ★
        </span>
      );
    }

    return stars;
  };

  const getPlatformIcon = (platforms) => {
    const platformsstring = Array.isArray(platforms)
      ? platforms.join(", ")
      : platforms;

    const platformIcons = [];

    if (platformsstring.includes("PlayStation")) {
      platformIcons.push(psIcon);
    }
    if (platformsstring.includes("Xbox")) {
      platformIcons.push(xboxIcon);
    }
    if (platformsstring.includes("PC")) {
      platformIcons.push(pcIcon);
    }
    if (platformsstring.includes("Android")) {
      platformIcons.push(androidIcon);
    }
    if (platformsstring.includes("Nintendo")) {
      platformIcons.push(nintendoIcon);
    }

    return (
      <>
        {platformIcons.map((icon) => (
          <img src={icon} alt={"icon"} />
        ))}
      </>
    );
  };

  return (
    <div className="detail-general">
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="detail-container">
          <button
            className="detail-button"
            onClick={() => window.history.back()}
          >
            BACK
          </button>

          <div className="detail-left">
            <h1>{videogamedetail.name}</h1>
            <img
              className="detail-image"
              src={
                videogamedetail.image
                  ? videogamedetail.image.replace(
                      "/media/",
                      "/media/crop/600/400/"
                    )
                  : defaultimage
              }
              alt={videogamedetail.name}
            />
            <h4>Release Date: {videogamedetail.releasedate}</h4>
            <div className="star-rating">Rating: {renderStars()}</div>
            <div className="platform-icons">
              Platforms:
              {videogamedetail.platforms &&
                getPlatformIcon(videogamedetail.platforms)}
            </div>
          </div>
          <div className="detail-right">
            <p>
              {processDescription(
                videogamedetail.description
                  ? videogamedetail.description
                  : "There's no game with that ID"
              )}
            </p>
            <div>
              <span style={{ "font-weight": "bold" }}>Genres: </span>
              {videogamedetail.gamegenres || videogamedetail.genres
                ? (videogamedetail.gamegenres || videogamedetail.genres).map(
                    (genre) => <span key={genre}> {genre}</span>
                  )
                : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;

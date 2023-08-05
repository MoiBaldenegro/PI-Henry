const axios = require("axios");
const url = "https://api.rawg.io/api/games";
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame } = require("../db");

const getbyidvideogames = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el id es un UUID válido
    const isUUID =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      );

    // Si el id es UUID, búsqueda del videojuego en la base de datos local
    let videogame;
    if (isUUID) {
      videogame = await Videogame.findOne({
        where: { id },
      });
    }

    // Si no se encuentra en la base de datos local, hacer una solicitud a la API externa
    if (!videogame) {
      // Realizar la solicitud a la API externa utilizando axios
      const { data } = await axios(`${url}/${id}?key=${API_KEY}`);

      // Si no se encuentra el videojuego en la API, lanzar un error
      if (!data) {
        // throw Error(`ID ${id} Not Found`);
        return res.status(200).json("El Id no existe");
      }

      // Mapear los datos de la API para crear un objeto con la información del videojuego
      videogame = {
        id: data.id,
        name: data.name,
        releasedate: data.released,
        rating: data.rating,
        description: data.description,
        platforms: data.platforms.map((plat) => plat.platform.name),
        image: data.background_image,
      };
    }

    return res.status(200).json(videogame);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getbyidvideogames;

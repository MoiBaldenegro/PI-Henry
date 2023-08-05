const axios = require("axios");
const url = "https://api.rawg.io/api/genres";
require("dotenv").config();
const { API_KEY } = process.env;
const { Genre } = require("../db");

const getallgenres = async (req, res) => {
  try {
    // Realizar la solicitud a la API externa para obtener los géneros
    const response = await axios(`${url}?key=${API_KEY}`);

    // Mapear la respuesta de la API a objetos de género
    const Generos = response.data.results.map((data) => ({
      id: data.id,
      name: data.name,
      games_count: data.games_count,
    }));

    // Crear los géneros en la base de datos y obtenerlos con findOrCreate
    const Genres = await Promise.all(
      Generos.map(async (gen) => {
        const { id, name } = gen;
        const [genre] = await Genre.findOrCreate({
          where: { id, name },
        });
        return genre;
      })
    );

    res.status(200).json(Genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getallgenres;

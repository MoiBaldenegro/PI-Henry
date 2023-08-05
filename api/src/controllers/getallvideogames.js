const axios = require("axios");
const url = "https://api.rawg.io/api/games";
require("dotenv").config();
const { API_KEY } = process.env;

const getallvideogames = async (req, res) => {
  try {
    // Obtenemos el número de página desde los query parameters
    const page = req.query.page || 1;

    // Realizamos una solicitud a la API externa usando axios
    const response = await axios(`${url}?key=${API_KEY}&page=${page}`);

    // Mapeamos la respuesta obtenida a un formato de objetos que necesitamos
    const videoGames = response.data.results.map((data) => ({
      id: data.id,
      name: data.name,
      releasedate: data.released,
      rating: data.rating,
      description: data.description,
      platforms: data.platforms.map((plat) => plat.platform.name),
      image: data.background_image,
    }));

    res.status(200).json(videoGames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getallvideogames;

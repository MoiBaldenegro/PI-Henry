const { Favorite } = require("../db");

const getFavById = async (req, res) => {
  try {
    const { userid } = req.params;

    if (!Number.isInteger(+userid)) {
      return res.status(400).json({ error: "Invalid userid" });
    }

    const favs = await Favorite.findAll({ where: { userid } });

    return res.status(200).json(favs);
  } catch (error) {
    throw error;
  }
};

module.exports = getFavById;

const { Favorite, User } = require("../db");
const { v4: uuidv4 } = require("uuid");

const postfav = async (req, res) => {
  try {
    const { id, name, platforms, image, releasedate, rating, userid } =
      req.body;

    if (!id || !name || !platforms || !image || !releasedate) {
      return res.status(400).send("Faltan datos");
    }

    if (!userid) {
      return res.status(400).send("falta el userid");
    }

    const newfavorite = await Favorite.create({
      userid,
      id: id.toString(),
      name,
      platforms,
      image,
      releasedate,
      rating,
    });

    const userfind = await User.findAll({ where: { id: userid } });

    await newfavorite.addUsers(userfind);

    const allfav = await Favorite.findAll();

    return res.status(200).json(allfav);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postfav;

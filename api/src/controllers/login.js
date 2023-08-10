const { User } = require("../db");

const login = async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) return res.status(400).send("Faltan datos");

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).send("Usuario no encontrado");

    const userid = user.id;

    return user.password === password
      ? res.json({ access: true, userid })
      : res.status(403).send("Contraseña incorrecta");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = login;

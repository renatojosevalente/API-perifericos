const Usuario = require("../models/user.models.js");
const jwt = require('jsonwebtoken');
const jwtSecret = 'seu-segredo-aqui'; // Nunca coloque segredos diretamente no código

const addUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const newUser = {
      nome,
      email,
      senha,
    };

    const user = await Usuario.create(newUser);

    res.status(200).json({ message: "Usuário cadastrado com sucesso", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const findUser = await Usuario.getOne(email);

    if (!findUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (findUser.senha !== senha) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    jwt.sign({ id: findUser._id, email: findUser.email }, jwtSecret, { expiresIn: '48h' }, (error, token) => {
      if (error) {
        return res.status(400).json({ error: "Falha interna" });
      }
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addUser, authUser };
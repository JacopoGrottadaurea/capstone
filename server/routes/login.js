const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Post - Gestisce le richieste di accesso degli utenti
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica le credenziali dell'utente
    const user = await UserModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Nome utente o password non validi' });
    }

    // Se l'accesso è stato effettuato con successo, genera un token
    const payload = { userId: user._id };
    const secret = 'your-secret-key';
    const token = jwt.sign(payload, secret, { expiresIn: '14m' });

    console.log(payload, secret, token)

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Errore interno del server' });
  }
});

module.exports = router;
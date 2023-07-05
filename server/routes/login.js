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

    // Se l'accesso è stato effettuato con successo, genera un token di accesso
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    // Genera un token di aggiornamento
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    // Invia i token al client
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Errore interno del server' });
  }
});


module.exports = router;

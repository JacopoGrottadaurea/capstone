const express = require('express');
const router = express.Router();
const GameModel = require('../models/games');

router.post('/addgames', async (req, res) => {
  const { title, description, image, gallery, videoId, url, releaseDate, genres } = req.body;

  try {
    const game = new GameModel({ title, description, image, gallery, videoId, url, releaseDate, genres });
    const newGame = await game.save();
    res.status(200).send({
      message: "Nuovo gioco aggiunto al database",
      payload: newGame
    });
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

router.get('/games', async (req, res) => {
  try {
    const games = await GameModel.find();
    res.status(200).send(games);
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

router.get('/games/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const game = await GameModel.findById(_id);
    if (!game) {
      res.status(404).send({
        message: 'Gioco non trovato'
      });
    } else {
      res.status(200).send(game);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

router.put('/games/:_id/unfavorite', async (req, res) => {
  try {
    const { _id } = req.params;
    const game = await GameModel.findById(_id);
    if (!game) {
      res.status(404).send({
        message: 'Gioco non trovato'
      });
    } else {
      await GameModel.updateOne({ _id }, { isFavorite: false });
      res.status(200).send({
        message: 'Gioco rimosso dai preferiti'
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

router.put('/games/:_id/favorite', async (req, res) => {
  try {
    const { _id } = req.params;
    const game = await GameModel.findById(_id);
    if (!game) {
      res.status(404).send({
        message: 'Gioco non trovato'
      });
    } else {
      await GameModel.updateOne({ _id }, { isFavorite: true });
      res.status(200).send({
        message: 'Gioco aggiunto ai preferiti'
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});



module.exports = router;

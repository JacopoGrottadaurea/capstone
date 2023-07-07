const express = require('express');
const router = express.Router();
const GameModel = require('../models/games');

router.post('/addgames', async (req, res) => {
  const { title, description, image, gallery, videoId, url, releaseDate, genres } = req.body;

  try {
    // Verifica se esiste già un gioco con lo stesso titolo e descrizione
    const existingGame = await GameModel.findOne({ title, description });
    if (existingGame) {
      res.status(400).send({
        message: 'Esiste già un gioco con lo stesso titolo e descrizione'
      });
      return;
    }

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

// Get - Cerca i giochi in base a una query di ricerca
router.get('/search', async (req, res) => {
  const { q } = req.query;

  try {
    // Cerca i giochi in base al titolo
    const games = await GameModel.find({ title: new RegExp(q, 'i') });
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Errore interno del server' });
  }
});

// Per trovare il singolo gioco

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

/*

// Aggiungi qui il nuovo endpoint per restituire i dati dei giochi
app.get('/games', async (req, res) => {
  try {
    const games = await GameModel.find();
    console.log('Dati dei giochi:', games); // Aggiungi questa riga
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Errore interno del server' });
  }
});

// Aggiungi qui il nuovo endpoint per aggiornare i dati di un gioco
app.patch('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { isFavorite } = req.body;
    await GameModel.findOneAndUpdate({ _id: id }, { isFavorite });
    res.status(200).send({ message: 'Gioco aggiornato correttamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Errore interno del server' });
  }
}); */


// Gestione preferiti

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

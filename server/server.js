const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5020;

// Importa le route
const usersRoute = require('./routes/users');
const commentsRoute = require('./routes/comments');
const gamesRoute = require('./routes/games');
const loginRoute = require('./routes/login');

// Importa il modello Game
const GameModel = require('./models/games');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', usersRoute);
app.use('/', commentsRoute);
app.use('/', gamesRoute);
app.use('/', loginRoute);

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
});

mongoose.connect('mongodb+srv://peanut:Tx0tirhVkMyKLXMH@cluster0.srsr8rx.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Errore di connesione al database'));
db.once('open', () => {
  console.log('Database connesso correttamente');
});

app.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT}`));

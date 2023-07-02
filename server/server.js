const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5020;

// Importa le route
const usersRoute = require('./routes/users');
const commentsRoute = require('./routes/comments');
// Importa la route che definisce l'endpoint /addgames
const gamesRoute = require('./routes/games');

const app = express();

// Middleware: permette di interpretare il body in formato json
app.use(express.json());
app.use(cors());

// Routes
app.use('/', usersRoute);
app.use('/', commentsRoute);
// Usa la route che definisce l'endpoint /addgames
app.use('/', gamesRoute);

mongoose.connect('mongodb+srv://peanut:Tx0tirhVkMyKLXMH@cluster0.srsr8rx.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Errore di connesione al database'));
db.once('open', () => {
  console.log('Database connesso correttamente');
});

// Mettiamo in ascolto express sulla nostra PORT
app.listen(PORT, /* callback */ () => console.log(`Server avviato sulla porta ${PORT}`));

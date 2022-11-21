const express = require ('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io')
const mongoose = require('mongoose');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');


const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

  // connects our backend code with the database
  mongoose.connect('mongodb+srv://krzemir:sddnELAx5cBlAGd5@cluster0.pu04hcg.mongodb.net/NewWaveDB?retryWrites=true&w=majority');

  //mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  console.log(db)

  db.once('open', () => {
    console.log('Connected to the database')
    //console.log(db)
  });
  db.on('error', err => console.log('Error:', err));


const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!', socket.id);
  io.emit('seatsUpdated', db.seats)
  console.log('server db-seats', db.seats)
});

app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })
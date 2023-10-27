// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB Configuration
const db = process.env.MONGODB_URI; // Remplacez par votre URI MongoDB Atlas
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport Middleware (pour gérer l'authentification)
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
const users = require('./routes/users');
app.use('/api/users', users);

app.listen(port, () => console.log(`Server is running on port ${port}`));

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const cors = require('cors');
const passport = require('passport');
var flash = require('connect-flash');
//need cookie parser?

require('dotenv/config');

// MIDDLEWARE
app.use(express.json());

app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000'
}));

//TODO: find out more about this
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

// PASSPORT
const loadUserConfig = require('./passport-config/userLocalConfig');
loadUserConfig(passport);

// DATABASE
mongoose.connect(process.env.DB_CONNECTION_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

// ROUTES
const userCardRouter = require('./routes/userCardRoutes');
app.use('/api/userCards', userCardRouter);

const userDetailsRouter = require('./routes/userDetailsRoutes');
app.use('/api/userDetails', userDetailsRouter);

const locationsRouter = require('./routes/locationRoutes');
app.use('/api/locations', locationsRouter);

const friendListsRouter = require('./routes/friendListsRoutes');
app.use('/api/friendLists', friendListsRouter);

const authRouter = require('./routes/authRoutes');
app.use('/api/auth', authRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
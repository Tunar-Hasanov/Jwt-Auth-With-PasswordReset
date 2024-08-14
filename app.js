// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require('dotenv');

// dotenv konfiqurasiya
dotenv.config();

const app = express();

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// CORS settings
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// AuthRoutes import edin
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
// mainRoutes import edin
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);
// MailService routes import edin
const EmailRouter = require('./routes/emailVerify');
app.use('/', EmailRouter);
// PasswordReset routes import edin
const passwordResetRouter = require('./routes/passwordReset');
app.use('/api/auth', passwordResetRouter);
module.exports = app;

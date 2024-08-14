// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../conf/db/models/user');
const verifyToken = require('../middlewares/auth');
const router = express.Router();
const { sendVerificationEmail } = require('../utils/emailService');

const JWT_SECRET = process.env.JWT_SECRET;

// Giriş səhifəsi
router.get('/login', (req, res) => {
  res.render('login');
});

// Qeydiyyat səhifəsi
router.get('/register', (req, res) => {
  res.render('register');
});

// Qeydiyyat
router.post('/register', async (req, res, next) => {
  try {
    const { userId, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ userId }, { email }] });
    if (existingUser) {
      const error = new Error('User ID və ya E-poçt artıq mövcuddur');
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      userId,
      email,
      password: hashedPassword,
      isVerified: false
    });

    await user.save();

    const verificationToken = jwt.sign(
      { userId: user.userId, email: user.email },
      JWT_SECRET,
      { expiresIn: '1m' }
    );

    await sendVerificationEmail(user, verificationToken);

    res.status(201).json({ message: 'İstifadəçi uğurla qeydiyyatdan keçdi. Hesabınızı təsdiqləmək üçün e-poçtunuza baxın.' });
  } catch (error) {
    next(error);
  }
});

// Giriş
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Təsdiqləmə uğursuz oldu');
      error.statusCode = 401;
      throw error;
    }

    if (!user.isVerified) {
      const error = new Error('Giriş etmədən əvvəl e-poçtunuzu təsdiqləyin');
      error.statusCode = 403;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Təsdiqləmə uğursuz oldu');
      error.statusCode = 401;
      throw error;
    }

    const jwtToken = jwt.sign(
      { email: user.email, userId: user.userId },
      JWT_SECRET,
      { expiresIn: "1m" }
    );

    res.cookie('token', jwtToken, { httpOnly: true });

    return res.status(200).json({
      accessToken: jwtToken,
      userId: user.userId,
    });
  } catch (error) {
    next(error);
  }
});

// Profil
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    return res.status(200).json({
      message: `User ${user.email}`,
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


module.exports = router;

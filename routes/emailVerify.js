const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../conf/db/models/user');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.get('/verify/:token', async (req, res, next) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findOne({ userId });
    if (!user) {
      const error = new Error('Yanlış təsdiqləmə tokeni');
      error.statusCode = 400;
      throw error;
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Hesab uğurla təsdiqləndi. İndi giriş edə bilərsiniz.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// routes/passwordReset.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../conf/db/models/user');
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.get('/password-reset-request', (req, res) => {
    res.render('password_reset_request');
});

router.post('/password-reset-request', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '2m' }
        );

        const resetLink = `${process.env.SITE_URL}/api/auth/password-reset/${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Şifrəni Sıfırlayın',
            html: `
                <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%); padding: 40px; text-align: center; font-family: 'Arial', sans-serif; color: #333;">
                    <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); display: inline-block; max-width: 600px;">
                        <h1 style="color: #555;">Şifrəni Sıfırlayın</h1>
                        <p style="color: #777;">Şifrəni sıfırlamaq üçün aşağıdakı linkə tıklayın:</p>
                        <a href="${resetLink}" style="background-color: #6200ea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-size: 16px; margin-top: 20px;">Şifrəni Sıfırlayın</a>
                        <p style="margin-top: 30px; color: #999;">Bu sorğunu siz etməmisinizsə, lütfən, bu e-məktubu nəzərə almayın. Tokenin müddəti bitmədən 2 dəqiqəniz var.</p>
                    </div>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        res.status(200).send('Şifrə sıfırlama linki e-poçtunuza göndərildi.');
    } else {
        res.status(404).send('İstifadəçi tapılmadı.');
    }
});

router.get('/password-reset/:token', (req, res) => {
    const { token } = req.params;

    try {
        res.render('password_reset', { token });
    } catch (error) {
        res.status(400).json({ message: 'Yanlış və ya vaxtı keçmiş token' });
    }
});

router.post('/password-reset/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (user) {
            user.password = await bcrypt.hash(password, 10);
            await user.save();

            res.status(200).send('Şifrə uğurla dəyişdirildi.');
        } else {
            res.status(400).send('İstifadəçi tapılmadı.');
        }
    } catch (error) {
        res.status(400).send('Şifrə sıfırlama linkinin müddəti bitib və ya etibarsızdır.');
    }
});

module.exports = router;

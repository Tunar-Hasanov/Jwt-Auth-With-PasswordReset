# JWT (JSON Web Token) ilə Qeydiyyat, Giriş və E-poçt Doğrulama

Bu layihə, istifadəçilərin qeydiyyatdan keçməsi, giriş etməsi və e-poçtlarını doğrulaması üçün JWT (JSON Web Token) istifadə edən bir server tətbiqidir. JWT, istifadəçi autentifikasiyası və məlumat mübadiləsi üçün təhlükəsiz və rahat bir üsuldur.

## 🚀 Xüsusiyyətlər

- ✅ **İstifadəçi Qeydiyyatı**: Yeni istifadəçilərin qeydiyyatdan keçərək hesab yaratması.
- 📧 **E-poçt Doğrulaması**: İstifadəçinin qeydiyyatı tamamlandıqdan sonra doğrulama linki olan bir e-poçt göndərilir.
- 🔑 **İstifadəçi Girişi**: Qeydiyyatdan keçmiş istifadəçilərin sistemə daxil olması.
- 🔒 **JWT Yaratmaq və Göndərmək**: İstifadəçi giriş etdikdən sonra JWT yaradılır və brauzer cookie-lərinə göndərilir.
- 🛡️ **Autentifikasiyanın Təmin Edilməsi**: Giriş tələb edən səhifələr və ya resurslar üçün JWT vasitəsilə autentifikasiya yoxlanılır.
- 🔄 **Şifrə Sıfırlama**: İstifadəçilərə e-poçt vasitəsilə şifrə sıfırlama linki göndərilir və şifrələri yenidən təyin edə bilərlər.

## 🛠️ Tələb olunanlar

- **Node.js** və **npm** (Node Package Manager) – Server tərəfli JavaScript kodunu işlətmək üçün.
- **Express.js** – Node.js üçün sürətli və asan veb tətbiqi quruluşu.
- **jsonwebtoken** – İstifadəçi məlumatlarının təhlükəsiz şəkildə ötürülməsi üçün JWT yaratmaq və yoxlamaq.
- **Nodemailer** – E-poçt göndərmək üçün istifadə olunan kitabxana.
- **dotenv** – Ətraf mühit dəyişənlərini idarə etmək üçün.
- **cookie-parser** – HTTP cookie-lərini asanlıqla parse etmək üçün.
- **bcryptjs** – Şifrələrin təhlükəsiz şəkildə saxlanması üçün istifadə olunan şifrə hashing kitabxanası.
- **cors** – Müxtəlif domenlər arasında resurs mübadiləsinə icazə vermək üçün.
- **body-parser** – HTTP sorğularının bədənini parse etmək üçün.
- **mongoose** – MongoDB ilə asanlıqla iş aparmaq üçün obyekt məlumat modelləşdirmə kitabxanası.

## 🔧 Quraşdırma

1. **Bu repozitoriyanı klonlayın:**

   ```bash
   git clone https://github.com/Tunar-Hasanov/Jwt-Auth-With-NodeMailer
   cd Jwt-Auth-With-PasswordReset-main
   npm i
   npm start

document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const userId = document.getElementById('userId').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('/auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, email, password })
      });

      const data = await response.json();

      if (response.ok) {
          alert('Qeydiyyat uğurlu oldu! E-poçt ünvanınıza doğrulama e-poçtu göndərildi.');
          window.location.href = '/auth/login';
      } else {
          if (data.message === 'E-posta artıq istifadə olunur') {
              alert('Qeydiyyat uğursuz oldu. Lütfən, məlumatlarınızı yoxlayın və yenidən cəhd edin.');
          } else {
              alert('Bu e-posta ünvanı artıq istifadə olunur. Başqa bir e-posta ünvanı istifadə edin.');
          }
      }
  } catch (error) {
      console.error('', error);
      alert('Bu e-posta ünvanı artıq istifadə olunur. Başqa bir e-posta ünvanı istifadə edin');
  }
});

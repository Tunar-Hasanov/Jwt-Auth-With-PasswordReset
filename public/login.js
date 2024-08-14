document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
          localStorage.setItem('token', data.accessToken);
          window.location.href = '/profile.html';
      } else {
          if (data.message === 'Pass incorrect' || data.message === 'Mail adress tapilmadi') {
              alert(data.message);
          } else {
              alert('xeta.');
          }
      }
  } catch (error) {
      console.error('xeta: ', error);
      alert('xeta.');
  }
});

function retourAccueil() {
    window.history.back();
}

async function handleSubmit(e) {
    e.preventDefault();

    const user = document.getElementById('user').value.trim();
    const pass = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('error-message');


    errorDiv.classList.remove('show');
    errorDiv.textContent = '';

    const formData = new FormData();
    formData.append('username', user);
    formData.append('password', pass);


    try {
        const res  = await fetch('../../api/login.php', { method: 'POST', body: formData });
        const data = await res.json();

        if (data.success) {
            window.location.href = data.redirect;
        }else {
            errorDiv.textContent = data.error || 'Une erreur est survenue.';
            errorDiv.classList.add('show');
        }
    } catch (err) {
        errorDiv.textContent = 'Impossible de contacter le serveur.';
        errorDiv.classList.add('show');
    }
}

const loginForm = document.querySelector('form');
if (loginForm) {
    loginForm.addEventListener('submit', handleSubmit);
}
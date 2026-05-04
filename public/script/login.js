function retourAccueil() {
    window.location.href = '../page/doc.html';
}

async function handleSubmit(e) {
    e.preventDefault();

    const user = document.getElementById('user').value.trim();
    const pass = document.getElementById('password').value.trim();

    const formData = new FormData();
    formData.append('username', user);
    formData.append('password', pass);

    try {
        const res  = await fetch('../../api/login.php', { method: 'POST', body: formData });
        const data = await res.json();

        if (data.success) {
            window.location.href = data.redirect;
        }
    } catch (err) {
        console.log(err);
    }
}

// On attache l'écouteur d'événement au formulaire
const loginForm = document.querySelector('form');
if (loginForm) {
    loginForm.addEventListener('submit', handleSubmit);
}
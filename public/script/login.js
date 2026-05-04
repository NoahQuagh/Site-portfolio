function retourAccueil() {
    window.location.href = '../page/doc.html';
}

async function handleSubmit(e) {
    e.preventDefault();

    const user = document.getElementById('user').value.trim();
    const pass = document.getElementById('password').value.trim();
    //const errU = document.getElementById('err-user');
    //const errP = document.getElementById('err-pass');

    errU.classList.remove('show');
    errP.classList.remove('show');

    //if (!user) { errU.classList.add('show'); return; }
    //if (!pass) { errP.classList.add('show'); return; }

    const formData = new FormData();
    formData.append('username', user);
    formData.append('password', pass);

    try {
        const res  = await fetch('../../api/login.php', { method: 'POST', body: formData });
        const data = await res.json();

        if (data.success) {
            window.location.href = data.redirect;
        } else {
            // Afficher l'erreur retournée par le serveur
            //errU.textContent = data.error;
            //errU.classList.add('show');
        }
    } catch (err) {
        //errU.textContent = 'Erreur serveur, réessaye.';
        //errU.classList.add('show');
        echo(err);
    }
}
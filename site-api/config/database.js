const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool({

    host: process.env.DB_HOST,


    user: process.env.DB_USER,


    password: process.env.DB_PASSWORD,


    database: process.env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0
});


const promisePool = pool.promise();

module.exports = promisePool;

promisePool.query('SELECT 1')
    .then(() => {
        console.log('[ \x1b[32mOK\x1b[0m ] Connexion à MySQL réussie');
    })
    .catch((error) => {
        console.error('Erreur de connexion à MySQL:', error.message);
        console.error('[ \x1b[36mINFO\x1b[0m ] MySQL est-il démarré ? (XAMPP Control Panel)');
    });

module.exports = promisePool;
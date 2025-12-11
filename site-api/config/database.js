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
        console.log('✅ Connexion à MySQL réussie');
    })
    .catch((error) => {
        console.error('❌ Erreur de connexion à MySQL:', error.message);
        console.error('\n💡 Vérifications :');
        console.error('   1. MySQL est-il démarré ? (XAMPP Control Panel)');
        console.error('   2. Les identifiants dans .env sont-ils corrects ?');
        console.error('      DB_HOST=' + process.env.DB_HOST);
        console.error('      DB_USER=' + process.env.DB_USER);
        console.error('      DB_NAME=' + process.env.DB_NAME);
    });


/*
module.exports permet d'utiliser ce pool dans d'autres fichiers

Dans un autre fichier, on pourra faire :
const db = require('./config/database');
const [results] = await db.query('SELECT * FROM projets');
*/

module.exports = promisePool;
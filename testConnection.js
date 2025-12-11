const db = require('./site-api/config/database');

async function testConnection() {
    console.log('\n🔍 TEST DE CONNEXION À LA BASE DE DONNÉES\n');

    try {
        const [rows] = await db.query('SELECT 1 AS test');

        console.log('✅ Connexion réussie');


        const [dbInfo] = await db.query('SELECT DATABASE() AS current_db');

        console.log('✅ Base de données active:', dbInfo[0].current_db);


        const [tables] = await db.query('SHOW TABLES');

        if (tables.length === 0) {
            console.log('⚠️  Aucune table trouvée');
            console.log('💡 Lance le script schema.sql pour créer les tables');
        } else {
            console.log('✅ Tables trouvées :');
            tables.forEach((table, index) => {
                // Le nom de la table est dans une propriété avec un nom dynamique
                const tableName = Object.values(table)[0];
                console.log(`   ${index + 1}. ${tableName}\n`);
            });
        }

    } catch (error) {
        // ==============================================
        // GESTION DES ERREURS
        // ==============================================

        console.error('\n❌ ERREUR LORS DES TESTS');
        console.error('Type:', error.code);
        console.error('Message:', error.message);

        // Afficher des solutions selon le type d'erreur
        if (error.code === 'ECONNREFUSED') {
            console.error('\n💡 SOLUTION :');
            console.error('   → MySQL n\'est pas démarré');
            console.error('   → Ouvre XAMPP Control Panel et clique "Start" pour MySQL');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n💡 SOLUTION :');
            console.error('   → Mauvais identifiants MySQL');
            console.error('   → Vérifie DB_USER et DB_PASSWORD dans .env');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('\n💡 SOLUTION :');
            console.error('   → La base de données n\'existe pas');
            console.error('   → Lance le script schema.sql dans MySQL Workbench');
        }

    } finally {
        process.exit();
    }
}
testConnection();
<?php
chdir('/var/www/html');

shell_exec('git reset --hard origin/main 2>&1');

$output = shell_exec('git pull origin main 2>&1');

echo "<h2>Résultat du déploiement :</h2>";
echo "<pre>$output</pre>";
?>
const { execSync } = require('child_process');
try {
    const out = execSync('npx prisma generate', { stdio: 'pipe', encoding: 'utf8' });
    console.log('SUCCESS:', out);
} catch (err) {
    console.log('--- STDOUT ---');
    console.log(err.stdout);
    console.log('--- STDERR ---');
    console.log(err.stderr);
}

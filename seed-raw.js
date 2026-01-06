const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function main() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    try {
        console.log('🌱 Seeding via raw PG...');
        const adminEmail = 'admin@cedarcore.com';
        const hashedPassword = await bcrypt.hash('password123', 10);

        // 1. Create Roles
        await pool.query('INSERT INTO "UserRole" (id, name) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING', ['role_admin', 'ADMIN']);
        await pool.query('INSERT INTO "UserRole" (id, name) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING', ['role_user', 'USER']);

        // 2. Get Admin Role ID
        const roleRes = await pool.query('SELECT id FROM "UserRole" WHERE name = $1', ['ADMIN']);
        const roleId = roleRes.rows[0].id;

        // 3. Create Admin User
        await pool.query(
            'INSERT INTO "User" (id, email, password, "roleId", "updatedAt") VALUES ($1, $2, $3, $4, NOW()) ON CONFLICT (email) DO UPDATE SET password = $3, "roleId" = $4, "updatedAt" = NOW()',
            ['admin_user', adminEmail, hashedPassword, roleId]
        );

        console.log('✅ Raw seed successful!');
        console.log('Admin: admin@cedarcore.com / password123');
    } catch (err) {
        console.error('❌ Raw seed failed:', err);
    } finally {
        await pool.end();
    }
}

main();

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: 'admin@cedarcore.com' },
            include: { role: true }
        });
        if (user) {
            console.log('User found:');
            console.log('Email:', user.email);
            console.log('Role:', user.role?.name);
            console.log('Password Hash:', user.password);
        } else {
            console.log('User NOT found: admin@cedarcore.com');
        }
    } catch (error) {
        console.error('Error checking user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

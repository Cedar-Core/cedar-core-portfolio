require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const all = await prisma.caseStudy.findMany({
            orderBy: { sortOrder: 'asc' }
        });

        console.log('Total case studies:', all.length);
        all.forEach(cs => {
            console.log(`- ${cs.title} (published: ${cs.published}, featured: ${cs.featured})`);
        });

        await prisma.$disconnect();
    } catch (err) {
        console.error('Error:', err);
        await prisma.$disconnect();
    }
}

check();

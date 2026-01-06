require('dotenv').config();
const { Pool } = require('pg');

async function main() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    try {
        console.log('🧹 Clearing case studies...');
        await pool.query('DELETE FROM "CaseStudy"');

        console.log('🌱 Restoring EXACT original case studies with correct tags...');

        // EXACT original case studies from Header.tsx navigation
        const caseStudies = [
            {
                slug: 'pointverse',
                number: '01',
                title: 'PointVerse',
                shortSummary: 'Custom Software, App Design & Development, Software Development',
                tags: JSON.stringify(['Custom Software', 'App Design & Development', 'Software Development']),
                coverImage: '/images/case-studies/pointverse.png',
                featured: true,
                published: true,
                sortOrder: 1
            },
            {
                slug: 'invoverse',
                number: '02',
                title: 'Invoverse',
                shortSummary: 'Custom Software, Web Design & Development, Business Tools',
                tags: JSON.stringify(['Custom Software', 'Web Design & Development', 'Business Tools']),
                coverImage: '/images/case-studies/invoverse.png',
                featured: true,
                published: true,
                sortOrder: 2
            },
            {
                slug: 'walletly',
                number: '03',
                title: 'Walletly',
                shortSummary: 'App Design, Development, Mobile Development',
                tags: JSON.stringify(['App Design', 'Development', 'Mobile Development']),
                coverImage: '/images/case-studies/walletly.png',
                featured: true,
                published: true,
                sortOrder: 3
            },
            {
                slug: 'drop-x',
                number: '04',
                title: 'Drop-x',
                shortSummary: 'Web Design & Development, Business Tools, AI & Payment Integration, Admin Dashboard',
                tags: JSON.stringify(['Web Design & Development', 'Business Tools', 'AI & Payment Integration', 'Admin Dashboard']),
                coverImage: '/images/case-studies/drop-x.png',
                featured: true,
                published: true,
                sortOrder: 4
            },
            {
                slug: 'feature',
                number: '05',
                title: 'Feature',
                shortSummary: 'App Design, Strategy, Third Party Integrations',
                tags: JSON.stringify(['App Design', 'Strategy', 'Third Party Integrations']),
                coverImage: '/images/case-studies/feature.jpg',
                featured: true,
                published: true,
                sortOrder: 5
            }
        ];

        for (const cs of caseStudies) {
            await pool.query(
                `INSERT INTO "CaseStudy" (id, slug, number, title, "shortSummary", tags, "coverImage", featured, published, "sortOrder", "createdAt", "updatedAt")
                VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`,
                [cs.slug, cs.number, cs.title, cs.shortSummary, cs.tags, cs.coverImage, cs.featured, cs.published, cs.sortOrder]
            );
            console.log(`   ✓ ${cs.title}: ${JSON.parse(cs.tags).join(', ')}`);
        }

        console.log('✅ EXACT original case studies restored!');
    } catch (err) {
        console.error('❌ Failed:', err);
    } finally {
        await pool.end();
    }
}

main();

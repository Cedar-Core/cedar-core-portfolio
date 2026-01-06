require('dotenv').config();
const { Pool } = require('pg');

async function main() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    try {
        console.log('🧹 Clearing case studies...');
        await pool.query('DELETE FROM "CaseStudy"');

        console.log('🌱 Restoring original case studies with exact tags...');

        // Exact original case studies from /portfolio
        const caseStudies = [
            {
                slug: 'pointverse',
                number: '01',
                title: 'PointVerse',
                shortSummary: 'Custom Software, App Design & Development, Software Development',
                tags: JSON.stringify(['SaaS', 'Software']),
                coverImage: '/images/case-studies/pointverse.png',
                featured: true,
                published: true,
                sortOrder: 1
            },
            {
                slug: 'invoverse',
                number: '02',
                title: 'Invoverse',
                shortSummary: 'Smart invoicing system for businesses',
                tags: JSON.stringify(['Web', 'SaaS']),
                coverImage: '/images/case-studies/invoverse.png',
                featured: true,
                published: true,
                sortOrder: 2
            },
            {
                slug: 'walletly',
                number: '03',
                title: 'Walletly',
                shortSummary: 'Mobile wallet application',
                tags: JSON.stringify(['App', 'Mobile']),
                coverImage: '/images/case-studies/walletly.png',
                featured: true,
                published: true,
                sortOrder: 3
            },
            {
                slug: 'drop-x',
                number: '04',
                title: 'Drop-x',
                shortSummary: 'Web Design & Development, Business Tools, AI & Payment Integration',
                tags: JSON.stringify(['Web', 'AI']),
                coverImage: '/images/case-studies/drop-x.png',
                featured: true,
                published: true,
                sortOrder: 4
            },
            {
                slug: 'feature',
                number: '05',
                title: 'Feature',
                shortSummary: 'Design and Go-To-Market strategy',
                tags: JSON.stringify(['Design', 'GTM']),
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

        console.log('✅ Original case studies restored!');
    } catch (err) {
        console.error('❌ Failed:', err);
    } finally {
        await pool.end();
    }
}

main();

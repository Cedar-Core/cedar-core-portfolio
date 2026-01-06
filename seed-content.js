require('dotenv').config();
const { Pool } = require('pg');

async function main() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    try {
        console.log('🌱 Seeding testimonials and case studies...');

        // Seed Testimonials
        const testimonials = [
            {
                quote: "Cedar Core transformed our online presence completely. The team's attention to detail and creative approach made all the difference.",
                author: "Ahmad Khalil",
                company: "Tech Innovations LLC",
                featured: true,
                published: true,
                sortOrder: 1
            },
            {
                quote: "Working with Cedar Core was an absolute pleasure. They delivered a stunning website that exceeded our expectations.",
                author: "Rami Saad",
                company: "Digital Solutions Inc",
                featured: true,
                published: true,
                sortOrder: 2
            },
            {
                quote: "The professionalism and expertise Cedar Core brought to our project was impressive. Highly recommended!",
                author: "Lara Abdallah",
                company: "Creative Studio",
                featured: true,
                published: true,
                sortOrder: 3
            }
        ];

        for (const t of testimonials) {
            await pool.query(
                `INSERT INTO "Testimonial" (id, quote, author, company, featured, published, "sortOrder", "createdAt", "updatedAt")
                VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, NOW(), NOW())
                ON CONFLICT DO NOTHING`,
                [t.quote, t.author, t.company, t.featured, t.published, t.sortOrder]
            );
        }

        // Seed Case Studies
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
                shortSummary: 'Web Design & Development, Business Tools, AI & Payment Integration, Admin Dashboard',
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
                `INSERT INTO "CaseStudy" (id, slug, number, title, "shortSummary", tags, featured, published, "sortOrder", "createdAt", "updatedAt")
                VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
                ON CONFLICT (slug) DO NOTHING`,
                [cs.slug, cs.number, cs.title, cs.shortSummary, cs.tags, cs.featured, cs.published, cs.sortOrder]
            );
        }

        console.log('✅ Seeded testimonials and case studies!');
    } catch (err) {
        console.error('❌ Seed failed:', err);
    } finally {
        await pool.end();
    }
}

main();

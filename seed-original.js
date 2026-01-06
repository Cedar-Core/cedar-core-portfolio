require('dotenv').config();
const { Pool } = require('pg');

async function main() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    try {
        console.log('🧹 Clearing testimonials...');
        await pool.query('DELETE FROM "Testimonial"');

        console.log('🌱 Restoring original testimonials...');

        // Original short testimonials from your old portfolio
        const testimonials = [
            {
                quote: "Cedar Core helped us redesign our website and the results have been fantastic. Professional team, great communication.",
                author: "Ahmad K.",
                company: "Local Trading Company",
                featured: true,
                published: true,
                sortOrder: 1
            },
            {
                quote: "We worked with Cedar Core to build our platform. They delivered quality work on time and were responsive throughout.",
                author: "Rami S.",
                company: "SaaS Startup",
                featured: true,
                published: true,
                sortOrder: 2
            },
            {
                quote: "Cedar Core delivered exactly what we needed. Their technical expertise and attention to detail impressed us.",
                author: "Lara A.",
                company: "SaaS Startup",
                featured: true,
                published: true,
                sortOrder: 3
            }
        ];

        for (const t of testimonials) {
            await pool.query(
                `INSERT INTO "Testimonial" (id, quote, author, company, featured, published, "sortOrder", "createdAt", "updatedAt")
                VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, NOW(), NOW())`,
                [t.quote, t.author, t.company, t.featured, t.published, t.sortOrder]
            );
        }

        console.log('✅ Original testimonials restored!');
    } catch (err) {
        console.error('❌ Failed:', err);
    } finally {
        await pool.end();
    }
}

main();

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function checkAuth() {
  try {
    console.log('Checking users...\n');
    
    const users = await prisma.user.findMany({
      include: { role: true }
    });
    
    console.log(`Found ${users.length} user(s):\n`);
    
    for (const user of users) {
      console.log(`Email: ${user.email}`);
      console.log(`Role: ${user.role?.name || 'No role'}`);
      console.log(`Password hash: ${user.password.substring(0, 20)}...`);
      console.log('---');
    }
    
    // Test password verification
    if (users.length > 0) {
      const testPassword = 'admin123'; // Common test password
      console.log(`\nTesting password "${testPassword}" against first user...`);
      const match = await bcrypt.compare(testPassword, users[0].password);
      console.log(`Match: ${match}`);
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAuth();

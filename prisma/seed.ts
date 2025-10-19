import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123456', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@geetaverse.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@geetaverse.com',
      password: adminPassword,
      role: 'ADMIN',
      isPremium: true,
      emailVerified: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create test premium user
  const premiumPassword = await bcrypt.hash('Premium@123', 10);
  const premiumUser = await prisma.user.upsert({
    where: { email: 'premium@geetaverse.com' },
    update: {},
    create: {
      name: 'Premium User',
      email: 'premium@geetaverse.com',
      password: premiumPassword,
      role: 'USER',
      isPremium: true,
      premiumExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      emailVerified: true,
    },
  });
  console.log('✅ Premium user created:', premiumUser.email);

  // Create test regular user
  const userPassword = await bcrypt.hash('User@123', 10);
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@geetaverse.com' },
    update: {},
    create: {
      name: 'Regular User',
      email: 'user@geetaverse.com',
      password: userPassword,
      role: 'USER',
      isPremium: false,
      emailVerified: true,
    },
  });
  console.log('✅ Regular user created:', regularUser.email);

  // Create some sample notes for the regular user
  await prisma.note.createMany({
    data: [
      {
        userId: regularUser.id,
        title: 'Karma Yoga',
        content:
          'The teaching of performing ones duty without attachment to results is profound and practical.',
        verseRef: 'BG2.47',
      },
      {
        userId: regularUser.id,
        title: 'Chapter 1 Reflection',
        content:
          'Arjuna dilemma represents the universal human condition of moral confusion.',
        verseRef: 'BG1.1',
      },
    ],
  });
  console.log('✅ Sample notes created');

  // Create some sample bookmarks
  await prisma.bookmark.createMany({
    data: [
      {
        userId: regularUser.id,
        verseRef: 'BG2.47',
        tags: ['favorite', 'karma-yoga'],
      },
      {
        userId: regularUser.id,
        verseRef: 'BG4.7',
        tags: ['dharma', 'incarnation'],
      },
    ],
  });
  console.log('✅ Sample bookmarks created');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📝 Test Accounts:');
  console.log('━'.repeat(50));
  console.log('Admin:   admin@geetaverse.com   / Admin@123456');
  console.log('Premium: premium@geetaverse.com / Premium@123');
  console.log('User:    user@geetaverse.com    / User@123');
  console.log('━'.repeat(50));
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

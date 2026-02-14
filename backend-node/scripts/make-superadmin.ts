/**
 * Script to make a user a SuperAdmin
 * Usage: tsx scripts/make-superadmin.ts <user-email>
 */
import { db } from '../src/infrastructure/db/drizzle/client';
import { usersTable, superAdminsTable } from '../src/infrastructure/db/drizzle/schema';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function makeSuperAdmin(userEmail: string) {
  try {
    console.log(`Making user ${userEmail} a SuperAdmin...`);

    // Find user by email
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail))
      .limit(1);

    if (!user) {
      console.error(`❌ User with email ${userEmail} not found!`);
      process.exit(1);
    }

    console.log(`✓ Found user: ${user.id} (${user.name})`);

    // Check if already SuperAdmin
    const [existing] = await db
      .select()
      .from(superAdminsTable)
      .where(eq(superAdminsTable.userId, user.id))
      .limit(1);

    if (existing) {
      if (existing.isActive) {
        console.log(`✓ User is already an active SuperAdmin`);
      } else {
        // Reactivate
        await db
          .update(superAdminsTable)
          .set({ isActive: true })
          .where(eq(superAdminsTable.userId, user.id));
        console.log(`✓ Reactivated SuperAdmin status`);
      }
    } else {
      // Create SuperAdmin record
      await db.insert(superAdminsTable).values({
        userId: user.id,
        isActive: true,
      });
      console.log(`✓ Created SuperAdmin record`);
    }

    console.log(`\n✅ Success! User ${userEmail} is now a SuperAdmin.`);
    console.log(`   You can now access /superadmin/* routes.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Get email from command line
const userEmail = process.argv[2];

if (!userEmail) {
  console.error('Usage: tsx scripts/make-superadmin.ts <user-email>');
  console.error('Example: tsx scripts/make-superadmin.ts admin@example.com');
  process.exit(1);
}

makeSuperAdmin(userEmail);

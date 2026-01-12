#!/usr/bin/env node
/**
 * Seed script for populating rules table with curated rules
 * Usage: npm run seed
 */

import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';
import { rules } from './rules-data';
import type { Database } from '../src/lib/database.types';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceRoleKey ? '✓' : '✗');
  console.error('\nPlease check your .env file.');
  process.exit(1);
}

// Create Supabase admin client
const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
}) as any; // Temporary workaround for type inference issues

/**
 * Compute SHA256 hash of normalized content
 */
function computeContentHash(content: string): string {
  // Normalize: trim whitespace, convert to lowercase, remove extra spaces
  const normalized = content
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  
  return createHash('sha256').update(normalized).digest('hex');
}

/**
 * Seed rules into the database
 */
async function seedRules() {
  console.log(`\n🌱 Starting seed process for ${rules.length} rules...\n`);

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    const ruleNum = i + 1;

    try {
      // Compute content hash
      const contentHash = computeContentHash(rule.content);

      // Prepare rule data
      const ruleData = {
        title: rule.title,
        description: rule.description || null,
        content: rule.content,
        tools: rule.tools,
        task_types: rule.task_types,
        stacks: rule.stacks || null,
        category: rule.category || null,
        tags: rule.tags || null,
        content_hash: contentHash,
        status: 'approved' as const,
        upvotes: 0,
        downvotes: 0,
        verified_upvotes: 0,
        verified_downvotes: 0,
      };

      // Check if rule with same content_hash exists
      const { data: existing } = await supabase
        .from('rules')
        .select('id')
        .eq('content_hash', contentHash)
        .maybeSingle();

      let data, error;
      
      if (existing) {
        // Update existing rule
        const result = await supabase
          .from('rules')
          .update(ruleData)
          .eq('content_hash', contentHash)
          .select('id')
          .single();
        data = result.data;
        error = result.error;
      } else {
        // Insert new rule
        const result = await supabase
          .from('rules')
          .insert(ruleData)
          .select('id')
          .single();
        data = result.data;
        error = result.error;
      }

      if (error) {
        // Check if it's a duplicate (unique constraint violation)
        if (error.code === '23505') {
          console.log(`⏭️  [${ruleNum}/${rules.length}] Skipped: "${rule.title}" (already exists)`);
          skippedCount++;
        } else {
          console.error(`❌ [${ruleNum}/${rules.length}] Error: "${rule.title}"`);
          console.error('   ', error.message);
          errorCount++;
        }
      } else {
        console.log(`✅ [${ruleNum}/${rules.length}] Seeded: "${rule.title}"`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ [${ruleNum}/${rules.length}] Exception: "${rule.title}"`);
      console.error('   ', err instanceof Error ? err.message : String(err));
      errorCount++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Seed Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skippedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📦 Total: ${rules.length}`);
  console.log('='.repeat(50) + '\n');

  if (errorCount > 0) {
    console.error('⚠️  Some rules failed to seed. Check errors above.');
    process.exit(1);
  }

  console.log('✨ Seed completed successfully!\n');
}

// Run seed
seedRules().catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

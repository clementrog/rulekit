const IDENTITY_SECRET = process.env.IDENTITY_SECRET || '';

if (!IDENTITY_SECRET && typeof window === 'undefined') {
  console.warn('IDENTITY_SECRET is not set. Anonymous voting will not work properly.');
}

/**
 * Computes an identity hash from a rulekit_id using HMAC-SHA256.
 * This ensures we never store raw UUIDs in the database.
 * 
 * @param rulekitId - The UUID stored in localStorage
 * @returns The HMAC-SHA256 hash of the rulekit_id
 */
export async function computeIdentityHash(rulekitId: string): Promise<string> {
  if (!IDENTITY_SECRET) {
    throw new Error('IDENTITY_SECRET is not configured');
  }

  // Use Web Crypto API for browser compatibility
  if (typeof window !== 'undefined' && 'crypto' in window && 'subtle' in window.crypto) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(IDENTITY_SECRET);
    const messageData = encoder.encode(rulekitId);

    // Import key for HMAC
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    // Sign (HMAC)
    const signature = await crypto.subtle.sign('HMAC', key, messageData);

    // Convert to hex string
    const hashArray = Array.from(new Uint8Array(signature));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Fallback to Node.js crypto (server-side)
  if (typeof window === 'undefined') {
    const crypto = require('crypto');
    return crypto
      .createHmac('sha256', IDENTITY_SECRET)
      .update(rulekitId)
      .digest('hex');
  }

  throw new Error('Crypto API not available');
}

/**
 * Generates a UUID v4 string
 */
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Gets or creates a rulekit_id from localStorage.
 * This UUID is used to identify anonymous users for voting.
 * 
 * @returns The rulekit_id UUID string
 */
export function getOrCreateRulekitId(): string {
  if (typeof window === 'undefined') {
    throw new Error('getOrCreateRulekitId can only be called on the client');
  }

  const STORAGE_KEY = 'rulekit_id';
  
  // Try to get existing ID
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return existing;
  }

  // Generate new UUID v4
  const newId = generateUUID();
  localStorage.setItem(STORAGE_KEY, newId);
  return newId;
}

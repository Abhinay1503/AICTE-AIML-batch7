import { execSync } from 'child_process'
import { unlinkSync, existsSync } from 'fs'
import { resolve } from 'path'

const lockFilePath = resolve('pnpm-lock.yaml')

console.log('[v0] Starting pnpm lockfile regeneration...')

// Remove existing lockfile if it exists
if (existsSync(lockFilePath)) {
  console.log('[v0] Removing corrupted lockfile...')
  unlinkSync(lockFilePath)
  console.log('[v0] Lockfile removed')
}

// Regenerate lockfile
console.log('[v0] Regenerating pnpm lockfile...')
try {
  execSync('pnpm install --no-frozen-lockfile', { stdio: 'inherit' })
  console.log('[v0] Lockfile regenerated successfully')
} catch (error) {
  console.error('[v0] Error regenerating lockfile:', error.message)
  process.exit(1)
}

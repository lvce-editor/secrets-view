import type { Secret } from '../Secret/Secret.ts'

export const compareSecrets = (a: Secret, b: Secret): number => a.extensionId.localeCompare(b.extensionId) || a.key.localeCompare(b.key)

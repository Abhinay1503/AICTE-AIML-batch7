#!/bin/bash

# Regenerate pnpm lockfile
echo "Regenerating pnpm lockfile..."

# Remove existing lockfile
rm -f pnpm-lock.yaml

# Regenerate lockfile with pnpm
pnpm install --no-frozen-lockfile

echo "Lockfile regenerated successfully"

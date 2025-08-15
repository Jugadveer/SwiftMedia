#!/bin/bash
set -e

if [ -z "$GITHUB_TOKEN" ]; then
  echo "❌ GITHUB_TOKEN not set. Please add it in Vercel Environment Variables."
  exit 1
fi

# Configure git to use the token
git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"

# Install and pull LFS files
git lfs install --skip-repo
git lfs fetch --all
git lfs pull

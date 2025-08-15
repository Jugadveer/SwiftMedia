#!/bin/bash
set -e

echo "🔹 Checking GitHub token availability..."
if [ -z "$GITHUB_TOKEN" ]; then
  echo "❌ GITHUB_TOKEN is missing!"
  exit 1
fi

# Auth for normal git
git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"

# Auth for LFS
git config --global lfs.url "https://${GITHUB_TOKEN}@github.com/Jugadveer/SwiftMedia.git/info/lfs"

git lfs install --skip-repo
git lfs fetch --all
git lfs pull

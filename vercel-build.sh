#!/bin/bash
set -e
echo "🔹 Checking GitHub token availability..."
if [ -z "$GITHUB_TOKEN" ]; then
  echo "❌ GITHUB_TOKEN is missing!"
  exit 1
fi

git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"
git lfs install --skip-repo
git lfs fetch --all
git lfs pull

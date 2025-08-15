#!/bin/bash

# Setup Git to use the token for authentication
git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"

# Install and pull LFS files
git lfs install
git lfs pull



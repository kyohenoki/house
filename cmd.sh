#!/usr/bin/env zsh

set -e

MODE=${1:-none}

if [[ "$MODE" == "reset" ]]; then
  echo "installing"
  rm -rf .astro .volume .wrangler dist node_modules
  rm -f .env bun.lock
  cp .env.example .env
  bun install && bun types
else
  echo "none"
fi

if [ "$MODE" != "none" ]; then
  echo "complete"
fi

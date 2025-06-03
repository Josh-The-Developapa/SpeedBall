#!/bin/bash
PORT=5173
lsof -ti tcp:$PORT | xargs kill -9 || true
bun run dev

#!/bin/sh
set -e

npx prisma generate

npx prisma migrate dev

npm run start

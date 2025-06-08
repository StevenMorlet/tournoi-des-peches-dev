#!/bin/sh

echo "Applying Prisma migrations..."
npx prisma migrate deploy

echo "Migrations applied. Starting app..."
exec "$@"

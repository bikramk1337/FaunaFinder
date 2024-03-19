#!/bin/bash

# Exit in case of error
set -e

# Build and run containers
docker compose build
docker compose up -d

# Hack to wait for postgres container to be up before running alembic migrations
sleep 5;

# Run migrations
docker exec ff-backend alembic upgrade head

# Create initial data
docker exec ff-backend python3 app/seed.py
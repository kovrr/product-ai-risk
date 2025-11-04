#!/bin/bash
# AIKovrr Database Initialization Script for Docker
# This script runs automatically in the postgres container via /docker-entrypoint-initdb.d/

set -e

echo "Initializing AIKovrr database..."

# Create aikovrr schema
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create aikovrr schema
    CREATE SCHEMA IF NOT EXISTS aikovrr;

    -- Set default search path for the database
    ALTER DATABASE $POSTGRES_DB SET search_path TO aikovrr, public;
EOSQL

echo "✓ AIKovrr schema created and search path configured"

# Note: The schema SQL file (02-schema.sql) will be executed automatically
# Note: The data SQL file (03-data.sql) will be executed automatically

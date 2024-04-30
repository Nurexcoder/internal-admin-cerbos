#!/bin/sh

# Stop on error
set -e

# Run the database initialization
./init_db

# Run the main application
exec ./main

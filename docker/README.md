# Docker Deployment Configuration

This directory contains containerization files for building and running the FSP application in any cloud environment or local setup.

## Files
*   `Dockerfile` - A multi-stage production build configuration compiling the React frontend and setting up the Node.js production server.
*   `docker-compose.yml` - Sets up the web service along with a durable PostgreSQL container.

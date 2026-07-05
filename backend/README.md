# Backend Services Directory

This directory contains the Express-based server implementation of the **Future Scope Platform (FSP)** backend.

## Structure
*   `/auth` - JWT generation, verification, password hashing, and user validation.
*   `/middleware` - Role-based middleware, request validation, and activity log tracking.
*   `/routers` - Express endpoints separated by business domains (Education, Development, Placement, HR, Smart Campus).
*   `/schemas` - Validation definitions to enforce correct inputs.
*   `/services` - External utilities, database interaction managers, and controller business logic.

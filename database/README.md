# Database Storage Directory

This directory governs all data storage, persistence, and querying mechanisms for FSP.

## Structure
*   `/models` - Relational data entities including User, Profile, JobPost, Application, QuizResult, Attendance, Payroll, LeaveRequest, ChatHistory, and AgentLogs.
*   `/migrations` - Setup scripts and local schema versioning.

## Dev Storage
An embedded SQLite file or a JSON relational schema storage is used locally to run in the server environment without any heavy configuration, and is fully ready to scale to cloud-hosted PostgreSQL instances.

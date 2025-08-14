# Library Management System

A simple Node.js/Express application to manage books and borrowers. It supports adding, updating, deleting, listing, and searching books and borrowers, as well as checking out and returning books with due-date tracking. The API is documented via Swagger and is containerized with Docker.

### Features
- **Books**:
  - Add a book with title, author, ISBN, available quantity, and shelf location
  - Update a book’s details
  - Delete a book
  - List all books
  - Search by title, author, or ISBN
- **Borrowers**:
  - Register a borrower with name, email, and registered date
  - Update borrower details
  - Delete a borrower
  - List all borrowers
- **Borrowing**:
  - Check out a book to a borrower and track who has which book
  - Return a book
  - List books currently checked out by a borrower
  - Track due dates and list overdue books
- **Non-functional**:
  - Optimized read paths (indexes for common searches)
  - Extensible service structure for future features
  - Input validation and basic security middleware (Helmet, CORS, rate limiting)

### Tech Stack
- Node.js, Express
- Prisma ORM with PostgreSQL
- Docker
- Swagger

### Getting Started

1) Clone the repository
    ```bash
    git clone https://github.com/FadySameh20/Library-Management-System.git
    cd Library-Management-System
    ```

2) Create your environment file
    - Copy the example file and adjust values as needed:
        ```bash
        # macOS/Linux
        cp .env.example .env

        # Windows PowerShell
        Copy-Item .env.example .env
        ```

    - Set the values of the environment variables
        - `POSTGRES_DB`: Database name
        - `POSTGRES_USER`: Database name
        - `POSTGRES_PASSWORD`: Database name
        - `DATABASE_URL`: Database connection string for Prisma (already set)

3) Start with Docker Compose
    ```bash
    docker compose up --build
    ```

4) The backend will be available at [http://localhost:3000](http://localhost:3000)
    - API docs (Swagger UI): [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
  
### Database Schema Diagram
  <img width="536" height="511" alt="db_schema_diagram" src="https://github.com/user-attachments/assets/3db8f612-fd00-412b-a230-3474843532ce" />

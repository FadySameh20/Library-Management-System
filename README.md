# Library Management System

A simple library management system to manage books and borrowers. It supports adding, updating, deleting, listing, and searching books and borrowers, as well as checking out and returning books with due-date tracking. The API is documented via **Swagger** and is containerized with **Docker**.

### Features
- **Books**:
  - Add a book with title, author, ISBN, available quantity, and shelf location.
  - Update a book’s details.
  - Delete a book.
  - List all books **(paginated)**.
  - Search by title, author, or ISBN.
- **Borrowers**:
  - Register a borrower with name, email, and registered date.
  - Update borrower details.
  - Delete a borrower.
  - List all borrowers **(paginated)**.
  - Search by borrower name or email.
- **Borrowing**:
  - Check out a book to a borrower and track who has which book.
  - Return a book.
  - List books currently checked out by a borrower **(paginated)**.
  - Track due dates and list overdue books **(paginated)**.
- **Non-functional**:
  - Optimized read paths (indices for common searches).
  - Pagination to enahnce performance.
  - Extensible service structure for future features.
- **Bonus Points**:
  - Dockerizing the application using docker-compose.
  - Added unit tests for `Book` module --> To run tests: `npm test`.

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
        - `DATABASE_URL`: Database connection string for Prisma **(already set, no changes needed)**

3) Start the docker container with docker compose
    ```bash
    docker compose up --build
    ```

    This will the run `entrypoint.sh` file, which performs the following:
      - Generates Prisma client.
      - Run database migrations.
      - Run tests.
      - Start the backend application.

4) The backend will be available at [http://localhost:3000](http://localhost:3000)
    - API docs **(Swagger UI)**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
  
### Database Schema Diagram
  On starting the docker container, Prisma will run the migrations automatically.

  <img width="536" height="511" alt="db_schema_diagram" src="https://github.com/user-attachments/assets/3db8f612-fd00-412b-a230-3474843532ce" />

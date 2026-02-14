# Todo App - Multi-Backend Full Stack Application

A complete CRUD Todo application with **three backend implementations** (Node.js, Django, Spring Boot) sharing the same PostgreSQL database, allowing for performance comparison.

## 🚀 Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Mark todos as completed/incomplete
- ✅ Filter todos by status (All, Open, Done)
- ✅ Search todos by title or description
- ✅ Sort todos by creation date or priority
- ✅ Priority levels (1-5)
- ✅ Responsive UI with Tailwind CSS
- ✅ Type-safe with TypeScript
- ✅ Input validation (backend)
- ✅ Error handling
- ✅ **Three backend implementations** for performance comparison
- ✅ Request timing logging in all backends

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.9+ and pip (for Django backend)
- Java 17+ and Maven (for Spring Boot backend)
- Docker and Docker Compose (for PostgreSQL)
- Git

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Vite
- React Query (TanStack Query)
- Tailwind CSS
- Axios

### Backend Options
1. **Node.js** (Port 4000)
   - Express + TypeScript
   - Prisma ORM
   - Zod validation

2. **Django** (Port 4001)
   - Django REST Framework
   - Django ORM
   - Django serializers validation

3. **Spring Boot** (Port 4002)
   - Spring Boot 3.2
   - Spring Data JPA
   - Bean Validation
   - Flyway migrations

### Database
- PostgreSQL 15 (shared by all backends)

## 📁 Project Structure

```
.
├── client/                 # Frontend application (React + TypeScript)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # React Query hooks
│   │   ├── lib/           # API client
│   │   └── types/         # TypeScript types
│   └── package.json
│
├── server_nodejs/          # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── middleware/   # Express middleware
│   │   ├── types/         # TypeScript types & Zod schemas
│   │   └── utils/         # Utilities
│   ├── prisma/            # Prisma schema & migrations
│   └── package.json
│
├── server_django/          # Django backend
│   ├── todoapp/           # Django project settings
│   ├── todos/             # Todos app
│   │   ├── models.py      # Django models
│   │   ├── views.py       # API views
│   │   ├── serializers.py # DRF serializers
│   │   └── migrations/    # Django migrations
│   ├── manage.py
│   └── requirements.txt
│
├── server_springboot/      # Spring Boot backend
│   ├── src/main/java/com/todoapp/
│   │   ├── controller/    # REST controllers
│   │   ├── service/       # Business logic
│   │   ├── model/         # JPA entities
│   │   ├── repository/    # Data repositories
│   │   ├── config/        # Configuration
│   │   └── exception/     # Exception handlers
│   ├── src/main/resources/
│   │   └── db/migration/  # Flyway migrations
│   └── pom.xml
│
├── docker-compose.yml      # PostgreSQL & Adminer setup
└── README.md
```

## 🚀 Quick Start

### 1. Start PostgreSQL Database

```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port `5432`
- Adminer (database admin UI) on port `8080`

**Access Adminer:** http://localhost:8080
- System: PostgreSQL
- Server: postgres
- Username: todoapp
- Password: todoapp123
- Database: todoapp

### 2. Choose and Setup a Backend

You can run any of the three backends. They all connect to the same PostgreSQL database.

#### Option A: Node.js Backend (Port 4000)

```bash
cd server_nodejs

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

Backend will run on: http://localhost:4000

#### Option B: Django Backend (Port 4001)

```bash
cd server_django

# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver 4001
```

Backend will run on: http://localhost:4001

#### Option C: Spring Boot Backend (Port 4002)

```bash
cd server_springboot

# Copy environment file
cp .env.example .env

# Build and run (requires Maven)
mvn spring-boot:run

# Or build JAR and run
mvn clean package
java -jar target/todo-app-1.0.0.jar
```

Backend will run on: http://localhost:4002

### 3. Setup Frontend

```bash
cd client

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env to point to your chosen backend:
# VITE_API_BASE_URL=http://localhost:4000/api  # Node.js
# VITE_API_BASE_URL=http://localhost:4001/api  # Django
# VITE_API_BASE_URL=http://localhost:4002/api  # Spring Boot

# Start development server
npm run dev
```

Frontend will run on: http://localhost:5173

## 🔄 Switching Between Backends

To switch the frontend to a different backend, simply update `client/.env`:

```env
# For Node.js backend
VITE_API_BASE_URL=http://localhost:4000/api

# For Django backend
VITE_API_BASE_URL=http://localhost:4001/api

# For Spring Boot backend
VITE_API_BASE_URL=http://localhost:4002/api
```

Then restart the frontend dev server.

## 🗄️ Database Schema

All backends use the same PostgreSQL schema:

```sql
CREATE TABLE todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(120) NOT NULL,
    description VARCHAR(500),
    completed BOOLEAN NOT NULL DEFAULT false,
    priority INTEGER NOT NULL DEFAULT 3,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Migration Strategy

- **Node.js**: Uses Prisma migrations (`npm run prisma:migrate`)
- **Django**: Uses Django migrations (`python manage.py migrate`)
- **Spring Boot**: Uses Flyway migrations (automatic on startup)

**Important**: Run migrations for the backend you're using. All migrations create the same schema, so they're compatible. If you switch backends, ensure the schema exists (migrations are idempotent).

## 🔌 API Endpoints

All three backends expose the **same API**:

Base URL: `http://localhost:<port>/api`

### Health Check
```bash
GET /health
```

**Response:**
```json
{
  "data": {
    "status": "ok"
  }
}
```

### Get All Todos
```bash
GET /todos?status=all&sort=created_at_desc&q=search
```

**Query Parameters:**
- `status`: `all` | `open` | `done` (default: `all`)
- `sort`: `created_at_desc` | `created_at_asc` | `priority_desc` | `priority_asc` (default: `created_at_desc`)
- `q`: search query (optional)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Todo title",
      "description": "Todo description",
      "completed": false,
      "priority": 3,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "status": "all",
    "sort": "created_at_desc"
  }
}
```

### Get Todo by ID
```bash
GET /todos/:id
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "title": "Todo title",
    ...
  }
}
```

### Create Todo
```bash
POST /todos
Content-Type: application/json

{
  "title": "New Todo",
  "description": "Optional description",
  "priority": 3
}
```

**Response:** `201 Created`
```json
{
  "data": {
    "id": "uuid",
    "title": "New Todo",
    ...
  }
}
```

### Update Todo
```bash
PUT /todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true,
  "priority": 5
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "title": "Updated title",
    ...
  }
}
```

### Delete Todo
```bash
DELETE /todos/:id
```

**Response:** `204 No Content`

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {}
  }
}
```

## 📦 Available Scripts

### Node.js Backend (`server_nodejs/`)

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Django Backend (`server_django/`)

- `python manage.py runserver 4001` - Start development server
- `python manage.py migrate` - Run database migrations
- `python manage.py makemigrations` - Create new migrations
- `python manage.py createsuperuser` - Create admin user

### Spring Boot Backend (`server_springboot/`)

- `mvn spring-boot:run` - Start development server
- `mvn clean package` - Build JAR file
- `java -jar target/todo-app-1.0.0.jar` - Run JAR file

### Frontend (`client/`)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🧪 Example API Requests

### Health Check
```bash
curl http://localhost:4000/health
```

### Create a todo
```bash
curl -X POST http://localhost:4000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the todo app",
    "priority": 5
  }'
```

### Get all todos
```bash
curl http://localhost:4000/api/todos
```

### Get open todos
```bash
curl "http://localhost:4000/api/todos?status=open"
```

### Update a todo
```bash
curl -X PUT http://localhost:4000/api/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

### Delete a todo
```bash
curl -X DELETE http://localhost:4000/api/todos/{id}
```

## 📊 Performance Comparison

All three backends include request timing middleware/filters that log:
- HTTP method and path
- Response status code
- Request duration in milliseconds

Check the console/logs of each backend to compare performance.

### Logging Format

**Node.js:**
```
GET /api/todos - 200 - 15ms
```

**Django:**
```
GET /api/todos - 200 - 12.34ms
```

**Spring Boot:**
```
GET /api/todos - 200 - 18ms
```

## 🐳 Docker Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f postgres
```

### Remove volumes (⚠️ deletes data)
```bash
docker-compose down -v
```

## 🔧 Environment Variables

### Node.js Backend (`server_nodejs/.env`)

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todoapp
DB_USER=todoapp
DB_PASSWORD=todoapp123
DATABASE_URL="postgresql://todoapp:todoapp123@localhost:5432/todoapp?schema=public"
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Django Backend (`server_django/.env`)

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todoapp
DB_USER=todoapp
DB_PASSWORD=todoapp123
PORT=4001
DEBUG=True
SECRET_KEY=django-insecure-change-me-in-production
CORS_ORIGIN=http://localhost:5173
```

### Spring Boot Backend (`server_springboot/.env`)

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todoapp
DB_USER=todoapp
DB_PASSWORD=todoapp123
PORT=4002
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`client/.env`)

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

## 🔧 Troubleshooting

### Database connection issues
- Ensure PostgreSQL container is running: `docker-compose ps`
- Check database credentials in `.env` files match docker-compose settings
- Verify port 5432 is not in use by another service

### Port already in use
- Node.js (4000): Change `PORT` in `server_nodejs/.env`
- Django (4001): Change port in `python manage.py runserver <port>`
- Spring Boot (4002): Change `PORT` in `server_springboot/.env` or `application.properties`
- Frontend (5173): Change port in `client/vite.config.ts`

### Migration conflicts
- All backends create the same schema, so migrations are compatible
- If switching backends, ensure schema exists (run migrations for the backend you're using)
- To reset: `docker-compose down -v` then restart and run migrations

### CORS issues
- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL
- Check that frontend is running on the correct port (5173)

## 🐳 Deploy as separate repos (Docker + Render.com)

Each backend can be a **separate GitHub repo** and deployed on [Render.com](https://render.com) using Docker.

### Repos structure

- **Repo 1:** Only `server_nodejs/` contents (Dockerfile at root).
- **Repo 2:** Only `server_django/` contents (Dockerfile at root).
- **Repo 3:** Only `server_springboot/` contents (Dockerfile at root).

### Per-backend instructions

| Backend      | Dockerfile | Deploy guide      |
|-------------|------------|-------------------|
| Node.js     | `server_nodejs/Dockerfile`     | `server_nodejs/RENDER.md`     |
| Django      | `server_django/Dockerfile`     | `server_django/RENDER.md`     |
| Spring Boot | `server_springboot/Dockerfile` | `server_springboot/RENDER.md` |

1. Create a new repo and copy **only** that backend’s folder contents to the repo root (so the Dockerfile is at the root).
2. On Render: **New → Web Service**, connect the repo, set **Environment** to **Docker**.
3. Add the env vars listed in that backend’s `RENDER.md` (and a Render PostgreSQL DB if needed).
4. Deploy; Render will build the image and run it. Each backend reads `PORT` from the environment.

### Local Docker build/run

From each backend directory:

```bash
# Node.js
cd server_nodejs && docker build -t todo-nodejs . && docker run -p 4000:4000 -e DATABASE_URL="postgresql://..." -e CORS_ORIGIN=http://localhost:5173 todo-nodejs

# Django
cd server_django && docker build -t todo-django . && docker run -p 4001:4001 -e DB_HOST=... -e CORS_ORIGIN=http://localhost:5173 -e PORT=4001 todo-django

# Spring Boot
cd server_springboot && docker build -t todo-springboot . && docker run -p 4002:4002 -e DB_HOST=... -e CORS_ORIGIN=http://localhost:5173 -e PORT=4002 todo-springboot
```

## 📄 License

MIT

## 👤 Author

Multi-Backend Todo App - Performance Comparison Project

# Database of All Things (DBoAT)

A small fullstack application to track various consumed media, such as books I've read and games I've played.
Backend built with **Java & Spring Boot** and **PostgreSQL**. Frontend is using **Angular**.

## Features

- Show items in a list with details (type, date, title, author (for bookx), notes (optional))
- Create, read, update, and delete items (books and games, for now)
- RESTful API for backend operations

⚠ This project uses a local PostgreSQL database. Update application.properties to match your DB credentials.

## Technologies used

- **Backend:** Java, Spring Boot, Gradle, PostgreSQL, Spring Data JPA
- **Frontend:** TypeScript, Angular, HTML&CSS
- Docker & Docker Compose

## Getting Started

### Prerequisites

- Java 17+ (recommend 21)
- PostgreSQL (local instance or Docker)
- Node.js & npm (for Angular frontend)
- Gradle (for backend build)

### Setup

1. Clone the repo

2. Configure backend database in backend/src/main/resources/application.properties:

```spring.datasource.url=your_db_url
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
```

## Running locally

### Backend
```./gradlew bootRun```

### Frontend
```npm install``` \
```ng serve```

### Docker
```docker compose up```

### API Endpoints

| Method | Endpoint           | Description                |
|--------|------------------|----------------------------|
| GET    | `/api/items`      | Retrieve a list of all items |
| GET    | `/api/items/{id}` | Retrieve a single item by ID |
| POST   | `/api/items`      | Create a new item           |
| PUT    | `/api/items/{id}` | Update an existing item     |
| DELETE | `/api/items/{id}` | Delete an item by ID        |

**POST /api/items**

Request body:
```json
{
  "title": "Minesweeper",
  "type": "GAME",
  "completionDate": "1992-12-31"
}
{
  "title": "Reamde",
  "type": "BOOK",
  "completionDate": "2013-01-07",
  "author": "Neal Stephenson"
}
```

## Project steps

1. Created Spring Boot project using Spring Initializr: Gradle - Groovy, Java v21. Dependencies: Spring Web, PostgreSQL Driver, Spring Data JPA.
1. Created simple, one-table database model for now. Allowed items to be input are BOOK and GAME.
1. Created basic CRUD operations.
1. Added validation for title and item type. Customized error messages to be shown in the JSON error response.
1. Added simple tests for POST endpoint.
1. Created an Angular app with ```ng new```
1. Switched favicon.ico with an icon from https://icon-icons.com/icon/archives-folders-office/78536.
1. Set up Docker Engine and Docker Compose (because developing on a Debian VM; Docker Desktop is recommended for native environments).
    * Nginx build script created an "extra" browser folder which caused some confusion. Fixed by adjusting COPY path in Dockerfile.
    * Noticed that resulting website (if accessing with localhost) should – of course – be tested inside the VM, not on the host machine...
1. Added editing of existing items to form.
    * At this point, changed frontend code to utilize enum also on frontend side so that I don't have to hard-code values.
1. Struggled with view updating after database is updated.
1. Changed buttons to icons (free for commercial use from https://icon-icons.com).

## Next steps

1. Add form validation
1. Sort list by date (newest first)
1. Add more media types
1. Authentication to restrict form access
1. Filter list view by item type
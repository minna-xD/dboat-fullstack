# Database of All Things (DBoAT)

A small fullstack application to track various consumed media, such as books I've read and games I've played (v. 0.1).
Backend built with **Java & Spring Boot** and **PostgreSQL**. Frontend is using **Angular** and **TypeScript**.

---

## Features

- Create, read, update, and delete items (books and games, for now)
- PostgreSQL database.
- RESTful API for backend operations

⚠ This project uses a local PostgreSQL database. Update application.properties to match your DB credentials.

## Technologies used

- **Backend:** Java, Spring Boot, Gradle, PostgreSQL, Spring Data JPA
- **Frontend:** TypeScript, Angular, HTML&CSS

## Getting Started

### Prerequisites

- Java 17+ (recommend 21)
- PostgreSQL (local instance or Docker)
- Node.js & npm (for Angular frontend)
- Gradle (for backend build)

### Setup

1. Clone the repo:

```bash
git clone git@github.com:minna-xD/dboat-fullstack.git
cd dboat-fullstack
```
2. Configure backend database in backend/src/main/resources/application.properties:

```spring.datasource.url=your_db_url
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
```

3. Run the backend:
```cd dboat-backend
./gradlew bootRun
```

4. Run the frontend:

TODO

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
```

## Project steps

1. Created Spring Boot project using Spring Initializr: Gradle - Groovy, Java v21. Dependencies: Spring Web, PostgreSQL Driver, Spring Data JPA.
2. Created simple, one-table database model for now. Allowed items to be input are BOOK and GAME.
3. Created basic CRUD operations.
4. Added validation for title and item type. Customized error messages to be shown in the JSON error response.
5. Added simple tests for POST endpoint.
6. Created an Angular app with ```ng new```
7. Switched favicon.ico with an icon from https://icon-icons.com/icon/archives-folders-office/78536.
8. Set up Docker Engine and Docker Compose (because developing on a Debian VM; Docker Desktop is recommended for native environments).

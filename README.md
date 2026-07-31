# Books & Reviews API — CSE 341 Project 2 Part 1

CRUD API with two collections: **books** and **reviews**.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /books | Get all books |
| GET | /books/:id | Get one book |
| POST | /books | Create a book |
| PUT | /books/:id | Update a book |
| DELETE | /books/:id | Delete a book |
| GET | /reviews | Get all reviews |
| GET | /reviews/:id | Get one review |
| POST | /reviews | Create a review |
| PUT | /reviews/:id | Update a review |
| DELETE | /reviews/:id | Delete a review |

Docs at `/api-docs` (Swagger UI).

## Book fields (8 fields)
title, author, genre, publishedYear, pages, rating, isbn, description

## Review fields
bookId, reviewerName, rating, comment, createdAt


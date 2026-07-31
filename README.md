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

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in your MongoDB Atlas connection string. Create a NEW database (e.g. `booksReviewsDB`) in your existing cluster — do not reuse your Contacts database.
3. `npm start` (or `npm run dev` if you have nodemon)
4. Visit `http://localhost:3000/api-docs` to test routes with Swagger UI.

## Regenerating swagger.json

If you add or change routes, regenerate docs with:
```
npm run swagger
```

## Deploying to Render

1. Push this project to a new GitHub repo.
2. On Render, create a new Web Service, connect the repo.
3. Build command: `npm install`
4. Start command: `npm start` (or `node server.js`)
5. Add an environment variable `MONGODB_URI` in Render's dashboard (Environment tab) — same value as your local `.env`. Never commit `.env` to GitHub.
6. Once deployed, your Swagger docs will be at `https://yourAppName.onrender.com/api-docs`.

## For your video (5-8 min)

Walk through, per the rubric:
1. Show swagger.json/Swagger UI working at your Render link (not localhost).
2. Demonstrate GET, POST, PUT, DELETE for BOTH books and reviews, showing the DB actually updates (e.g. refresh GET after each write, or show MongoDB Atlas/Compass).
3. Show a validation failure (e.g. POST with missing title) returning 400.
4. Show an error case handled gracefully (e.g. GET/PUT/DELETE with a bad/nonexistent id) returning 400/404, not a crash.
5. Briefly show your GitHub repo and confirm `.env` is not there (check `.gitignore`).

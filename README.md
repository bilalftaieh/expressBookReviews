# Books Express Application

## Overview
This is a simple Express application that provides APIs for managing and retrieving book information.

## Features
- Get the list of all books
- Get book details based on ISBN
- Get book details based on author
- Get all books based on title
- Get book reviews
- Add and delete book reviews (requires user authentication)

## Routes
- `GET /`: Returns the list of all books
- `GET /isbn/:isbn`: Returns the details of a book based on ISBN
- `GET /author/:author`: Returns all books by a specific author
- `GET /title/:title`: Returns all books with a specific title
- `GET /review/:isbn`: Returns the reviews of a book based on ISBN
- `PUT /auth/review/:isbn`: Adds a book review (requires user authentication)
- `DELETE /auth/review/:isbn`: Deletes a book review (requires user authentication)
- `POST /login`: Authenticates a user's credentials and logs them in if valid. A JSON Web Token (JWT) is generated and stored in the user's session for subsequent requests.
- `POST /register`: Registers a new user with a username and password. If the username is already taken, the registration fails.

## Authentication
User authentication is required for adding and deleting book reviews. This application uses JSON Web Tokens (JWT) for authentication. The JWT contains the username of the user, which is used to associate the review with the user.

## Setup
1. Clone the repository
2. Install dependencies with `npm install`
3. Start the server with `npm start`

## Usage
You can test the APIs using any HTTP client like curl or Postman.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
Apache 2.0

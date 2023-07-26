# Node.js URL Shortener with Sequelize and User Authentication

This is a simple Node.js URL shortener project that allows you to shorten long URLs into shorter ones and provides user registration and login functionality. Before you can use this application, please ensure you have the following prerequisites installed and configured:

## Prerequisites

1. Node.js: Make sure you have Node.js installed on your system. You can download it from the official website: https://nodejs.org

2. Redis: This application uses Redis as a caching database to store the shortened URLs and improve performance. You should have Redis installed and running on your machine. You can download Redis from the official website: https://redis.io

3. PostgreSQL: This application uses PostgreSQL as the main database to store metadata about the shortened URLs and user authentication data. Make sure you have PostgreSQL installed and a database created for this application. You can download PostgreSQL from the official website: https://www.postgresql.org

4. Sequelize: This project utilizes Sequelize as the ORM (Object-Relational Mapping) tool to interact with the PostgreSQL database. It simplifies database operations and provides an easy way to manage models and relationships. You can install Sequelize using npm:

   ```
   npm install sequelize
   ```

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/abdulrehan1729/url-shortner-backend-pg-node.git
   cd url-shortner-backend-pg-node
   ```

2. Install dependencies:

   ```
   npm install
   ```

## Usage

1. Start the application:

   ```
   npm start
   ```

2. Database setup:  
   Run the following command to apply the database migrations and create the required tables:

   ```
   npm run migrate
   ```

3. Using the URL Shortener:

   - To shorten a URL, make a POST request to `/api/shorten` endpoint with the long URL in the request body. You will receive a JSON response containing the shortened URL.
   - To access the original URL, simply visit the shortened URL in your browser or make a GET request to it.

4. User Registration:

   - To register a new user, make a POST request to `api/user/register` endpoint with the following request body:

     ```
     {
       "firstName": "your-firstname",
       "lastName":"your-lastname",
       "email": "your-email@example.com",
       "password": "your-password"
     }
     ```

   - On successful registration, you will receive a JSON response with the user details and a JWT (JSON Web Token) that you can use for authentication in subsequent requests.

5. User Login:

   - To log in as a registered user, make a POST request to `api/user/login` endpoint with the following request body:

     ```
     {
       "email": "your-email@example.com",
       "password": "your-password"
     }
     ```

   - On successful login, you will receive a JSON response with the user details and a JWT that you can use for authentication.

## API Endpoints

- `POST /api/shorten`: Shorten a long URL. (Request body: { "url": "long-url-here" })
- `GET /api/redirect/:shortUrl`: Access the original URL associated with the given shortUrl code.
- `POST /api/user/register`: Register a new user. (Request body: { "firstName": "your-firstname", "lastName":"your-lastname","email": "your-email@example.com", "password": "your-password" })
- `POST /api/user/login`: Login as a registered user. (Request body: { "email": "your-email@example.com", "password": "your-password" })

---

Thank you for using the Node.js URL Shortener with Sequelize and User Authentication! If you encounter any issues or have any suggestions, please feel free to open an issue on our GitHub repository. Happy URL shortening and user management!

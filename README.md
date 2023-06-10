# express-request-logger

express-request-logger is a middleware for logging incoming requests in an Express application. It provides a convenient way to log the details of each incoming request, including the method, URL, headers, and body.

## Installation

Install the package using npm:

```shell
npm install express-request-logger
```

## Usage
Import the middleware in your Express application and use it as follows:

```javascript
const express = require('express');
const requestLogger = require('express-request-logger');

const app = express();

// Use the request logger middleware
app.use(requestLogger);

// ... Define your routes and other middleware ...

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```

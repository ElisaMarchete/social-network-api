# Social Network API

## Description

This is a REST API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. This application uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)
- [Walkthrough Video](#walkthrough-video)

## Installation

1. Clone the repository
2. Install dependencies

```
npm install
```

3. Start the server

```
npm start
```

## Usage

1. Open Insomnia Core
2. Create a new request
3. Enter the request URL
4. Select the request method
5. Enter the request body or parameters
6. Send the request

## API Endpoints

The API endpoints are as follows:

- `api/users` - Find all users / Create a new user
- `api/users/:id` - Find a specific user by ID / Update a user by ID / Delete a user by ID
- `api/users/:id/friends/:friendId` - Add a friend to a user's friend list / Delete a friend from a user's friend list
- `api/thoughts` - Find all thoughts / Create a new thought
- `api/thoughts/:id` - Find a specific thought by ID / Update a thought by ID / Delete a thought by ID
- `api/thoughts/:id/reactions` - Add a reaction to a thought
- `api/thoughts/:id/reactions/:reactionId` - Delete a reaction from a thought
-

## License

This project is licensed under the MIT License.

## Walkthrough Video

[![Walkthrough Video](https://ZM/0.jpg)](https)

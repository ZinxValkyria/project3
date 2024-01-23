
Express.js MediaVerse App

This is a simple Express.js web application that utilizes the Marvel Comics API, RAWG API, and Studio Ghibli API to provide information about Marvel characters, movies, and games.
Prerequisites

Before running the application, ensure you have the following installed:

    Node.js: Download and Install Node.js
    npm (Node Package Manager): Included with Node.js installation

Installation

    Clone the repository:

    bash

git clone https://github.com/your-username/express-marvel-app.git

Navigate to the project directory:

bash

cd express-marvel-app

Install dependencies:

bash

    npm install

Configuration

Before running the application, you need to set up your Marvel Comics API and RAWG API keys. Update the following variables in app.js:

javascript

// Marvel Comics API keys
const publicKey = "your-marvel-public-key";
const privateKey = "your-marvel-private-key";

// RAWG API key
const apiKey = 'your-rawg-api-key'; // Replace with your RAWG API key

Usage

Start the server:

bash

npm start

Visit http://localhost:3000 in your web browser to explore the application.
Endpoints

    /: Home page
    /movies: Movies page
    /contact: Contact page
    /marvel: Marvel characters page
    /gaming: Gaming page
    /search: Search for games (uses RAWG API)
    /api/anime: API endpoint for Studio Ghibli films
    /api/character: API endpoint for Marvel characters

License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

    Marvel Comics API: https://developer.marvel.com/
    RAWG Video Games Database API: https://rawg.io/apidocs
    Studio Ghibli API: https://ghibliapi.herokuapp.com/

Author

Blain Noone
# Marvel Character App

Welcome to the Marvel Character App! This web application allows you to retrieve information about Marvel characters using the Marvel Comics API.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Docker](#docker)
- [API Key](#api-key)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for Marvel characters and retrieve their information.
- Display character name, image, and description.

## Prerequisites

- Node.js and npm installed on your machine.
- Marvel API keys (public and private).

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/marvel-character-app.git

    Navigate to the project directory:

    bash

cd marvel-character-app

Install dependencies:

bash

    npm install

Usage

    Start the application:

    bash

    npm start

    Open your browser and visit http://localhost:3000.

    Enter a Marvel character's name in the form and click "Get Character Info."

    View the character information, including name, image, and description.

Docker

You can also run the application using Docker:

    Build the Docker image:

    bash

docker build -t marvel-character-app .

Run the Docker container:

bash

    docker run -p 3000:3000 marvel-character-app

    Access the application at http://localhost:3000.

API Key

Before running the application, replace the placeholder Marvel API keys in app.js with your actual keys.

javascript

const publicKey = 'YOUR_PUBLIC_KEY';
const privateKey = 'YOUR_PRIVATE_KEY';



# Thanks for reading

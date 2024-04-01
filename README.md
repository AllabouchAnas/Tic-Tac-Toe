# Tic-Tac-Toe Game

This project consists of a Tic-Tac-Toe game implemented using MERN stack.

## Features

- Play Tic-Tac-Toe against another player locally or online.
- Play Tic-Tac-Toe against an AI opponent.
- Real-time gameplay with WebSocket communication for online matches.
- Login/Register system for user authentication.
- User profiles to track game statistics and preferences.
- Leaderboard to display top players and their rankings.
- Responsive design for seamless gameplay experience across various screen sizes.

## Technologies Used

- MongoDB: NoSQL database
- Express.js: Web application framework
- React: JavaScript library for UI
- Node.js: JavaScript runtime environment
- WebSocket: Real-time communication protocol
- Flask: Python web framework
- NumPy: Scientific computing library for Python
- Monte Carlo Tree Search (MCTS): Search algorithm for decision processes
- Upper Confidence Bound (UCB): Algorithm for decision making in uncertainty

## Screenshots
![Screenshot GIF](https://github.com/AllabouchAnas/Tic-Tac-Toe/blob/main/Screenshots.gif)

## Installation

### Prerequisites

- Node.js, npm and Python installed on your machine.

### Client Installation

1. Clone the repository:

    ```
    git clone https://github.com/AllabouchAnas/Tic-Tac-Toe.git
    ```

2. Navigate to the `client` directory:

    ```
    cd client
    ```

3. Install dependencies:

    ```
    npm i
    ```

### Server Installation

1. Navigate to the root directory of the project:

    ```
    cd server
    ```

2. Install dependencies:

    ```
    npm i
    ```

3. Copy the .env.example file to create a new .env file:

    ```
    cp .env.example .env
    ```

4. Open and update the newly created `.env` file in a text editor with the necessary environment variables, such as the database connection URI and secret keys. For example:

    ```
    PORT=4000
    MONGODB_URI=mongodb://localhost:27017/tic-tac-toe
    SECRET_KEY=tictactoe
    ```

## Usage

### Starting the Server

1. Navigate to the `server` directory:

    ```
    cd server
    ```

2. Start the server:

    ```
    npm run dev
    ```

- The node server will run on `http://localhost:4000` by default.
- The flask server will run on `http://localhost:5000` by default.


### Starting the Client

1. Navigate to the `client` directory:

    ```
    cd client
    ```

2. Start the React development server:

    ```
    npm start
    ```

The client application will open in your default web browser at `http://localhost:3000`.

## Contributing

We welcome contributions from the community. Feel free to fork the repository, make improvements, and submit pull requests.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/awesome-feature`
3. Make changes and commit: `git commit -m 'Add awesome feature'`
4. Push to the branch: `git push origin feature/awesome-feature`
5. Open a pull request.

## License

This App is licensed under the [MIT License](https://choosealicense.com/licenses/mit/), allowing for open collaboration and innovation in the spirit of shared knowledge.

Thank you for being part of our community! If you have any questions or suggestions, feel free to open an issue or reach out to us. Happy coding! 🚀📞

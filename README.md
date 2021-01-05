# Multi Tic-tac-toe

This is the famous game tic-tac-toe. You can play it online here, and join through copying and pasting your friends join code. It is build with Node.js and Express as the backend. For the frontend React is used. I use Socket.io for the multiplayer functions.
I have made a cheatsheet for Socket.io [here](https://henrik-zenkert.gitbook.io/cheatsheetsocketio/).

## Getting Started

### Installing

For quick deployment make sure you get the github repo and install concurrently globally. This deployment will assume you install global commands with npm and use yarn locally

```bash
git clone https://github.com/YesSeri/multi-tictactoe
npm -g concurrently
```

Use the bash script `installAndRunServer.sh` to get started with the program. This will install the node_modules, and then start the server and the client, using the package [concurrently](https://www.npmjs.com/package/concurrently). 

Remember to set permissions for the script, if necessary. 
```bash
./installAndRunServer.sh

```

## Deployment

To be written. 

## Built With

* [React](https://reactjs.org/) - The web framework used
* [Node.js](https://nodejs.org/en/) - The server used
* [Express](https://expressjs.com/) - Framework for the server
* [Socket.io](https://socket.io/) -  JS library for realtime web applications

## Contributing

Just contact me or make a pull request if you want to. 

## Authors

* **Henrik Zenkert** - *Initial work* - [PurpleBooth](https://github.com/YesSeri)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

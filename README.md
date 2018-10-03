# simple-note

> *simple-note* is a web app that was built using MERN (Mongoose, Express.js, React, Node) stack. It's a practice project for me to learn about MERN development and my intro to Full-stack web development. 

## Demo GIF
![](simple-note.gif)

## Documentation 
The project is divided into 2 folders *client* and *server*. *client* will contain all html, css, javascript(React) while *server* contains Node.js, Mongoose, and Express scripts. 

Currently using MongoDB hosted locally during development. For production, an Mlab database was already set up that i will configure the app to use mlab in the future.
### Client
- Simple React app configured by create-react-app. Everything happens in App.js with all the http CRUD request. Utilizes the routes coded in serverside.
### Server
- Contains all scripts that configure the server, the database, the MongoDB model (Mongoose), routing, and controller functions. Default port is 3000.

## License


- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2015 © <a href="https://github.com/nguyenAn1201" target="_blank">An Nguyen</a>.

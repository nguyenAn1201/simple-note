const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // parse request of various type and create req.body that we can access in our routes
const cors = require('cors');

// Initialize express app
const app = express();

// add middleware with app.use(). Middleware is function that can access request and response object.
// Parse request of content type x-www-form-urlencoded and json
app.use(bodyParser.urlencoded({ extenssded: true}));
app.use(bodyParser.json());
app.use(cors());

// Configure the db
const dbConfig = require('./config/database.config');

// mongoose instance connecting database. Remember to run mongodb with mongod in another terminal
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.\n' + err);
    process.exit();
});


var port = 3000;
// Simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to SimpleNote"});
});
app.use(cors());

require("./routes/routes")(app);
// listen for requests
app.listen(port, () => {
    console.log("Server listening on port" + {port});
});


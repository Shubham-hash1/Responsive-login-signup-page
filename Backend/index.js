// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors')
// const AuthRouter = require('./Routes/AuthRouter')

// require('dotenv').config(); // ✅ load env

// // DB connection (auto runs)
// require('./Models/db');
// const PORT = process.env.PORT || 8080;

// // middleware
// app.use(bodyParser.json());
// app.use(cors());
// app.use('/auth', AuthRouter)

// // test route
// app.get('/ping', (req, res) => {
//     res.send('PONG');
// });

// // port

// // start server
// app.listen(PORT, () => {
//     console.log(`🚀 server is running on ${PORT}`);
// });

const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

require('./Models/db');

const AuthRouter = require('./Routes/AuthRouter');

const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json()); // ✅ use this
app.use(cors());

// routes
app.use('/auth', AuthRouter);

// test route
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// start server
app.listen(PORT, () => {
    console.log(`🚀 server is running on ${PORT}`);
});
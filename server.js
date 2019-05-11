require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const next = require('next')
const cors = require('cors');

const { mongoose } = require('./config/mongoose');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express();


    // Middleware
    server.use(bodyParser.json());
    server.use(cors());

    // Using routes
    server.use(require('./routes/routes'));

    server.get('*', (req, res) => {
        return handle(req, res)
      })
    
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
})
module.exports = { app };

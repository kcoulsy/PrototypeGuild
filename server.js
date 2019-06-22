require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const next = require('next')
const cors = require('cors');
const helmet = require('helmet');

require('./config/mongoose');
const routes = require('./routes/routes');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express();


    // Middleware
    server.use(bodyParser.json({limit: '50mb'}));
    server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    server.use(cors());
    server.use('/uploads', express.static('uploads'));
    server.use(helmet());
    // Using routes
    server.use(routes);

    server.get('*', (req, res) => {
        return handle(req, res)
      })
    
    server.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server running on port ${PORT}`)
    });
})
module.exports = { app };

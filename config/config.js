const config = require('./config.json');

const env = process.env.NODE_ENV || 'development';

// Go through all keys in the config and set them in process.env
if (env === 'development' || env === 'test' || env === 'production') {
    Object.keys(config[env]).forEach((key) => {
        process.env[key] = config[env][key];
    });
}

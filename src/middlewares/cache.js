const redis = require('redis');

const client = redis.createClient();

client.on('error', (error) => {
    console.error(error);
});

function cache(req, res, next) {
    const key = `${req.method}_${req.originalUrl}`
    client.get(key, (error, data) => {
        if (error || !data) {
            next();
        } else {
            console.log('Using Cache');
            res.send(data);
        }
    })
};

function refreshCache(req, data) {
    const key = `${req.method}_${req.originalUrl}`;
    client.set(key, JSON.stringify(data));
}

function eraseCache(req) {
    const key = `${req.method}_${req.originalUrl}`;
    console.log('Cache deleted');
    client.del(key);
}

module.exports = {
    cache,
    refreshCache,
    eraseCache
};
const redis = require('redis');
const client = redis.createClient({
  host: "redisdelilah.dnp3op.0001.sae1.cache.amazonaws.com",
  port: 6379
})

client.on('error', (error) => {
    console.error(error);
});

function cache(req, res, next) {
    const key = 'productos';
    client.get(key, (error, data) => {
        if (error || !data) {
            next();
        } else {
            console.log('Using Cache');
            res.send(data);
        }
    })
};

function refreshCache(key, data) {
    client.set(key, JSON.stringify(data));
}

function eraseCache(key) {
    console.log('Cache deleted');
    client.del(key);
}

module.exports = {
    cache,
    refreshCache,
    eraseCache
};
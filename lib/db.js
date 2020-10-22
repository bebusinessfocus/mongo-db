const mongoose = require('mongoose');

const { logger } = require('@bebusinessfocus/logger');

mongoose.Promise = global.Promise;

let cachedDb = null;

const defaultOptions = {
  useNewUrlParser: true,
  // Buffering means mongoose will queue up operations if it gets
  // disconnected from MongoDB and send them when it reconnects.
  // With serverless, better to fail fast if not connected.
  bufferCommands: false, // Disable mongoose buffering
  bufferMaxEntries: 0, // and MongoDB driver buffering
};

mongoose.connection.on('open', function onMongooseOpen() {
  logger.log('MongoDB mongoose -> connection opened!');
});
mongoose.connection.on('error', function onMongooseError(error) {
  logger.error('MongoDB mongoose error:', error);
});

const connect = async (url, options = {}) => {
  try {
    logger.time('mongoose.connect');
    cachedDb = mongoose.connect(url, { ...defaultOptions, ...options });

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await cachedDb;
    logger.timeEnd('mongoose.connect');
    const db = mongoose.connection;

    db.once('open', function onceOpen() {
      logger.log('MongoDB -> once connection opened!');
    });

    // When the mongodb server goes down, the driver emits a 'close' event
    db.on('close', function onClose() {
      logger.warn('MongoDB -> lost connection');
    });
    // The driver tries to automatically reconnect by default, so when the
    // server starts the driver will reconnect and emit a 'reconnect' event.
    db.on('reconnected', function onReconnected() {
      logger.log('MongoDB -> reconnected');
    });

    db.on('error', function onError(error) {
      logger.error('MongoDB error:', error);
    });

    return Promise.resolve(cachedDb);
  } catch (e) {
    cachedDb = null;
    logger.error(e);
    return Promise.reject(e);
  }
};

/**
 * [withDbConnect description]
 * @param {*} url
 * @param {*} options
 * @return {[type]} [description]
 */
const withDbConnect = async (url, options) => {
  const connectURL =
    url || process.env.MONGODB_URI || 'mongodb://localhost:27017';
  logger.info('MongoDB => connect to database', connectURL);
  if (cachedDb && mongoose.connection.readyState === 1) {
    logger.log('MongoDB => using existing database connection');
    return Promise.resolve(cachedDb);
  }

  logger.log('MongoDB => creating NEW database connection');
  return connect(connectURL, options);
};

module.exports = withDbConnect;

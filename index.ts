// Global variables
global.__DEV__ = process.env.NODE_ENV === "development";

require('./src/server');

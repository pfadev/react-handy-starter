// Require hook for @babel/register
require("@babel/register")({
  plugins: ["dynamic-import-node"],
});

// Global variables
global.DEV = process.env.NODE_ENV === 'development';

// Start Server
require('./src/server');

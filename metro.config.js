const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable Watchman and use Node's file watcher instead
config.watchFolders = [__dirname];
config.resolver.useWatchman = false;

module.exports = config;


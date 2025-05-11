// metro.config.js
const {getDefaultConfig} = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
  extraNodeModules: {
    crypto: require.resolve('react-native-quick-crypto'),
    buffer: require.resolve('react-native-buffer'),
    stream: require.resolve('stream-browserify'),
    'web-streams-polyfill': require.resolve('web-streams-polyfill'),
    process: require.resolve('process/browser'),
  },
};

module.exports = config;
  
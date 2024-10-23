module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
        moduleName: '@env', // Add this line
        path: '.env',
    }],
],
};

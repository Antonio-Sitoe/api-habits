process.env.EXPO_ROUTER_APP_ROOT = "../../src/app";
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module:react-native-dotenv"],
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      "nativewind/babel",
      require.resolve("expo-router/babel"),
    ],
  };
};

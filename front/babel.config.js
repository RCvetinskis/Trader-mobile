module.exports = function (api) {
  api.cache(true);
  const isProduction = process.env.NODE_ENV === "production";
  const envPath = isProduction ? ".env.production" : ".env";
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: envPath,
        },
      ],
    ],
  };
};

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 'off',
    'linebreak-style': 0,
    'no-console': 'off',
    'max-len': 'off',
    indent: 2,
  },
  settings: {
    'import/resolver': {
      alias: [
        ['components', './src/components/index'],
        ['api', './src/api'],
        ['utils', './src/utils/utils'],
        ['constants', './src/constants/constants'],
        ['pictureOfTheDay', './src/components/PictureOfTheDay/PictureOfTheDay'],
        ['poster', './src/api/poster'],
        ['fetcher', './src/api/fetcher'],
        ['speech', './src/speech/speech'],
      ],
    },
  },
};

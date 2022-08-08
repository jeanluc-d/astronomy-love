module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
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
        ['components', './client/src/components/index'],
        ['api', './client/src/api'],
        ['utils', './client/src/utils/utils'],
        ['constants', './client/src/constants/constants'],
        ['pictureOfTheDay', './client/src/components/PictureOfTheDay/PictureOfTheDay'],
        ['poster', './client/src/api/poster'],
        ['fetcher', './client/src/api/fetcher'],
        ['speech', './client/src/speech/speech'],
        ['useLocalStorageState', './client/src/hooks/useLocalStorageState/useLocalStorageState'],
      ],
    },
  },
};

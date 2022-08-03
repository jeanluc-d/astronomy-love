const path = require('path');
module.exports = {
  plugins: {
    tailwindcss: {
      config: path.join(__dirname, './client/tailwind.config.js'),
    },
    autoprefixer: {},
  },
}

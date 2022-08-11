/* eslint-disable import/extensions */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import translationsRoute from './routes/translations/translations.js';
import languagesRoute from './routes/languages/languages.js';
import picturesRoute from './routes/pictures/pictures.js';

const dirname = path.resolve();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors(), express.json(), express.static('./dist/'));

app.get('/pictures', picturesRoute);

app.get('/languages', languagesRoute);

app.post('/translations', translationsRoute);

app.all('*', (req, res) => {
  res.status(404).sendFile(path.join(dirname, './dist/404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

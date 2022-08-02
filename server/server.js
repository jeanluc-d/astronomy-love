import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import translationsRoute from './routes/translations/translations.js';
import languagesRoute from './routes/languages/languages.js';
import picturesRoute from './routes/pictures/pictures.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors(), express.json(), express.static('./dist/'));

app.get('/pictures', picturesRoute);

app.get('/languages', languagesRoute);

app.post('/translations', translationsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

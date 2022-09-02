/* eslint-disable import/extensions */
import express from 'express';
import * as deepl from 'deepl-node';
import NodeCache from 'node-cache';
import fetch from 'node-fetch';
import MS_PER_DAY from '../../constants/constants.js';

const router = express.Router();
const cache = new NodeCache({ checkperiod: 0 });

// const formatDate = require('../../utils/utils');
// env variables
const { DEEPL_API_KEY, LIBRE_API_KEY } = process.env;
const translator = new deepl.Translator(DEEPL_API_KEY);

router.post('/translations', async (req, res) => {
  console.log('translations');
  try {
    const {
      title, desc, to, date,
    } = req.body;

    if (to === 'fr') {
      const usage = await translator.getUsage();
      const { count, limit } = usage.character;
      const BUFFER_SIZE = 3000;

      // check if usage is within limits,
      // buffer is used since we're sending large chunks of text ~1000chars per request
      if (count < limit - BUFFER_SIZE && to === 'fr') {
        // get variables and create a cache key
        const cacheKey = `${date}_${to}`;

        // check if translation is cached
        const cachedTranslation = cache.get(cacheKey);
        if (cachedTranslation) {
          console.log('cache hit');
          // send cached translation
          res.status(200).json(cachedTranslation);
          return;
        }
        // if not cached, translate then cache
        const transTitle = await translator.translateText(title, 'en', to.toUpperCase());
        const transDesc = await translator.translateText(desc, 'en', to.toUpperCase());
        console.log('DeepL translation:', transTitle, transDesc);

        const data = { title: transTitle.text, desc: transDesc.text };
        // cache translation
        cache.set(cacheKey, data, MS_PER_DAY);

        // send translation
        res.status(200).json(data);
        return;
      }
    }
    // if not french or limit exceeded then use libre translate
    const libreTranslate = await fetch(`${process.env.LIBRE_ENDPOINT}/translate`, {
      method: 'POST',
      body: JSON.stringify({
        q: `${title}. ${desc}`,
        source: 'en',
        target: to,
        format: 'text',
        api_key: LIBRE_API_KEY,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const libreTranslation = await libreTranslate.json();
    console.log('Libre translation:', libreTranslation);

    // zh uses different spaces ( 。instead of . )
    if (to === 'zh') {
      const sentences = libreTranslation.translatedText.split('。');
      const translatedDescription = sentences.splice(1).join('。 ');
      const data = { title: sentences[0], desc: translatedDescription };
      res.status(200).json(data);
      return;
    }
    const sentences = libreTranslation.translatedText.split('.');
    const translatedDescription = sentences.splice(1).join('. ');
    const data = { title: sentences[0], desc: translatedDescription };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

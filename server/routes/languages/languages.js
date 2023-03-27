/* eslint-disable import/extensions */
import express from 'express';
import * as deepl from 'deepl-node';
import NodeCache from 'node-cache';
import MS_PER_DAY from '../../constants/constants.js';

const router = express.Router();
const cache = new NodeCache({ checkperiod: 0 });

const { DEEPL_API_KEY } = process.env;
const translator = new deepl.Translator(DEEPL_API_KEY);
router.get('/languages', async (req, res) => {
  try {
    const cacheKey = 'languages';

    // check if translation is cached
    const cachedTranslation = cache.get(cacheKey);
    if (cachedTranslation) {
      console.log('Languages cache hit');
      // send cached translation
      res.status(200).json(cachedTranslation);
      return;
    }
    const usage = await translator.getUsage();
    const { count, limit } = usage.character;
    const languages = [{
      name: 'English',
      code: 'en',
    }];
    const BUFFER_SIZE = 3000;
    if (count < limit - BUFFER_SIZE) {
      languages.push({ name: 'French', code: 'fr' });
    }
    // if not cached, request, process, and then cache

    // const languages = await fetch(`${process.env.LIBRE_ENDPOINT}/languages`, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // const libreTranslation = await languages.json();
    // // remove english from list since we will re-order it to be first
    // const filteredLanguages = libreTranslation.filter(language => !language.name.includes('English'));

    // // make arrays of language names and codes
    // const names = filteredLanguages.map(l => l.name)
    // const codes = filteredLanguages.map(lang => lang.code.toLowerCase())

    // // place english and french at the top of the list
    // // inefficent and cultural bias
    // const organizedNames = (['English', 'French', ...names.filter(l => l !== 'French')])
    // const organizedCodes = (['en', 'fr', ...codes.filter(l => l !== 'fr')])
    // const data = { names: organizedNames, codes: organizedCodes };

    cache.set(cacheKey, languages, MS_PER_DAY);
    res.status(200).json(languages);
  } catch (err) {
    console.error('error', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

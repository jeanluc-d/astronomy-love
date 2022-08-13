import fetcher from '../api/fetcher';
import { FORMAT_OPTIONS } from '../constants/constants';

export const addDefaultSrc = (ev) => {
  /* eslint-disable no-param-reassign */
  ev.target.src = 'https://wallpaperaccess.com/full/659142.jpg';
  ev.target.alt = 'Image Could Not Be Loaded';
};

export const toEasternTimeZone = (date) => date.toLocaleString('en-US', {
  timeZone: 'America/New_York',
  hour12: false,
});

export const formatStartDate = (date) => {
  const fullEasternTime = toEasternTimeZone(date);
  const split = fullEasternTime.split(',');
  const monthDayYear = split[0];
  const parts = monthDayYear.split('/');
  const rearrangedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;
  return rearrangedDate;
};

export const formatDate = (date) => {
  const today = new Date();
  if (date === today) {
    /**
      * have to set to eastern time zone to match NASA's APOD API
      * or the date may be off by one day depending on the clients timezone
      */
    return formatStartDate(date);
  }
  return date?.toISOString()?.split('T')[0];
};

export const translateDate = (date, lang) => new Date(date.replace(/-/g, '/')).toLocaleDateString(lang, FORMAT_OPTIONS);

export const getCurrentVoice = (currentLanguage, voices) => {
  const currentVoice = voices?.find((synthVoice) => {
    // grab the first two letters of the voices locale
    const synthVoiceLang = `${synthVoice.lang?.[0]}${synthVoice.lang?.[1]}`;
    if (synthVoiceLang === currentLanguage) {
      return true;
    }
    return false;
  });
  return currentVoice;
};

export const createCanTextToSpeechMap = (synthesisedVoiceArray) => {
  const map = new Map();
  synthesisedVoiceArray?.forEach((synth) => {
    const lang = `${synth.lang[0]}${synth.lang[1]}`;
    map.set(lang, true);
  });
  return map;
};

export const fetchAvailableLanguages = async (endPoint) => {
  const availableLangaugesArray = await fetcher(endPoint);
  return availableLangaugesArray;
};

export const blastOff = (object) => {
  let x = 1500;
  // eslint-disable-next-line array-callback-return
  Array.from({ length: 1 }, () => {
    setTimeout(() => {
      x -= 100;
      object.style.bottom = `${x}px`;
    }, 100);
  });
};

export const myScrollFunc = () => {
  const rocketShip = document.getElementById('item');
  const y = window.scrollY;
  if (!rocketShip) return;
  if (y >= 400) {
    rocketShip.style.display = 'block';
    rocketShip.style.transition = 'all 0.5s ease-in-out';
    // intentional dead zone in order to make room for blast off
  } else if (y < 350) {
    rocketShip.style.display = 'none';
    rocketShip.style.bottom = '2%';
  }
};

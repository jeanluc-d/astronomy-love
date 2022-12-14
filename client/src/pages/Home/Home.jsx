import React, { useState, useEffect, Suspense } from 'react';
/**
 * using useSWRImmutable hook since the data doesn't change/mutate
 * useSWRImmutable hook does auto caching on the client side
*/
import useSWRImmutable from 'swr/immutable';
import InfiniteScroll from 'react-infinite-scroll-component';
import { animateScroll as scroll } from 'react-scroll';
import {
  formatDate, myScrollFunc, getCurrentVoice, blastOff, createCanTextToSpeechMap, fetchAvailableLanguages,
} from 'utils';
import EasySpeech from 'easy-speech';
import initSpeech from 'speech';
import { MS_PER_DAY, MAX_CHAR_LENGTH } from 'constants';
import fetcher from 'fetcher';
import useLocalStorageState from 'useLocalStorageState';
import {
  PictureOfTheDay, Navbar, RocketMan, SpaceShip,
} from 'components';

const ServerErrorPage = React.lazy(() => ('./ServerErrorPage/ServerErrorPage'));

function Home() {
  // loading until the data is fetched
  const [loading, setLoading] = useState(true);

  // these will vary by the users browser
  const [voices, setVoices] = useState([]);
  const [currentVoice, setCurrentVoice] = useState();
  const [currentVoiceIndex, setCurrentVoiceIndex] = useLocalStorageState('astroVoice', -1);
  // used to show which languages are supported
  const [canTextToSpeechMap, setCanTextToSpeechMap] = useState();

  // these come from libre translation language endpoint
  const [languages, setLanguages] = useState();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentLanguageIndex, setCurrentLanguageIndex] = useLocalStorageState('astroLanguage', -1);
  /**
   * our end date is initially the current date
   * start date is initally yesterday
  */
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date(endDate - (MS_PER_DAY)));
  const [largeFont, setLargeFont] = useLocalStorageState('astroLargeFont', false);
  /**
   * data is the most recent array of pictures sent from the api
   * displayData is all the pictures received from the api
  */
  const { data, error } = useSWRImmutable(`${process.env.REACT_APP_ENDPOINT}pictures?start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`, fetcher);
  const [displayData, setDisplayData] = useState(data);

  /**
   * used with SWR and React Infinite Scroll to load more data
   * the range of the date gets backed by 2 days
  */
  const fetchMoreData = () => {
    // move the date range back by 2 days
    const start = startDate - (MS_PER_DAY);
    const end = startDate - (MS_PER_DAY * 2);
    setEndDate(new Date(start));
    setStartDate(new Date(end));
  };

  // used onClick to make the rocket fly while the page scrolls upwards
  const handleBlastOff = () => {
    scroll.scrollToTop();
    const rocketShip = document.getElementById('item');
    blastOff(rocketShip);
  };

  const handlePlayAudio = (title, desc) => {
    // combine the title and description for the text to speech
    const text = `${title}. ${desc}`;
    EasySpeech.speak({
      // Shorten a string to its last sentence that is under 1000 chars (IF LONGER THAN MAX_CHAR_LENGTH) or else speech breaks
      text: text.length <= MAX_CHAR_LENGTH ? text : text.slice(0, text.lastIndexOf('.', MAX_CHAR_LENGTH)),
      voice: currentVoice,
      volume: 0.5,
      pitch: 1,
      rate: 1,
      error: (e) => console.log(e),
    });
  };

  const handleToggleTextSize = () => {
    setLargeFont(!largeFont);
  };

  const handleCancelAudio = () => {
    EasySpeech.cancel();
  };

  const handleSetLanguage = (newLanguage, index) => {
    // put language index in local storage
    setCurrentLanguageIndex(index);
    // voice will set itself once the language is set
    setCurrentVoiceIndex(-1);
    setCurrentLanguage(newLanguage);
    handleCancelAudio();
  };
  const handleOnSetVoice = (newVoice, index) => {
    setCurrentVoiceIndex(index);
    setCurrentVoice(newVoice);
  };

  // on data fetch
  useEffect(() => {
    // check no error
    if (error) return;
    if (data?.length > 0) {
      /**
       * add the new data to the display data
       * ternary operator to check if the data is already in the display data
       * if there is data, then spread it then add the new data
      */
      if (displayData) {
        setDisplayData([...displayData, ...data]);
        return;
      }
      // set loading to false since we have data
      if (loading) setLoading(false);
      setDisplayData(data);
    }
  }, [data]);

  // on language change it will update the language of the text to speech - if it's available
  useEffect(() => {
    const updatedVoice = getCurrentVoice(currentLanguage, voices);
    // if the voice is found set it
    if (updatedVoice) {
      // if the voice is inside local storage then use that
      if (currentVoiceIndex > 0) {
        setCurrentVoice(voices[currentVoiceIndex]);
        return;
        // else set the voice to the first voice of that language
      }
      setCurrentVoice(updatedVoice);
      return;
    }
    setCurrentVoice(null);
  }, [currentLanguage, voices]);

  // on start up get the languages / init speech / add scroll to top listener
  useEffect(() => {
    const languageInitialization = async () => {
      const langArray = await fetchAvailableLanguages(`${process.env.REACT_APP_ENDPOINT}languages`);
      setLanguages(langArray);
      // check local storage for a saved language (it is an index of the languages array)
      if (currentLanguageIndex > 0) {
        try {
          const langFromStorage = langArray[currentLanguageIndex].code;
          setCurrentLanguage(langFromStorage);
        } catch (e) {
          setCurrentLanguage('en');
        }
      }
    };

    const voicesInitialization = async () => {
      const synthesisedVoiceArray = await initSpeech();
      setVoices(synthesisedVoiceArray);
      // if there is a saved voice in local storage, use that
      if (currentVoiceIndex > 0) {
        setCurrentVoice(synthesisedVoiceArray[currentVoiceIndex]);
      }
      // this will be used in the language dropdown to indicate which languages are voice supported
      const map = createCanTextToSpeechMap(synthesisedVoiceArray);
      setCanTextToSpeechMap(map);
    };

    voicesInitialization();
    languageInitialization();
    window.addEventListener('scroll', myScrollFunc);

    return () => {
      // cleanup on unmount, remove scroll listener
      window.removeEventListener('scroll', myScrollFunc);
    };
  }, []);
  if (loading) {
    return (
      <RocketMan />
    );
  }

  if (error) {
    return (
      <Suspense fallback={<RocketMan />}>
        <ServerErrorPage data={data} />
      </Suspense>
    );
  }

  return (
    <div className="App">
      <InfiniteScroll dataLength={displayData?.length || 0} next={fetchMoreData} hasMore>
        <Navbar languages={languages} canTextToSpeechMap={canTextToSpeechMap} handleSetLanguage={handleSetLanguage} currentLanguage={currentLanguage} voiceName={currentVoice?.name} voices={voices} handleOnSetVoice={handleOnSetVoice} handleCancelAudio={handleCancelAudio} />
        <h1 className="hidden pt-6 text-2xl text-center text-white -pb-4 fade-in md:block md:text-7xl" style={{ fontFamily: 'yellowtail' }}>Astronomy Love</h1>
        <div className="grid min-h-screen mb-6 fade-in max-w-screen place-items-center">
          {displayData?.map((entry) => (
            <div key={entry.date} className="py-6">
              <PictureOfTheDay
                entry={entry}
                currentLanguage={currentLanguage}
                handlePlayAudio={handlePlayAudio}
                handleCancelAudio={handleCancelAudio}
                canTTS={currentVoice}
                handleToggleTextSize={handleToggleTextSize}
                largeFont={largeFont}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <button type="button" onClick={handleBlastOff} id="item" className="btn px-4 py-4 text-white item ring-0 focus:ring-0">
        <SpaceShip />
      </button>
    </div>
  );
}

export default Home;

import React, { useState, useEffect, useCallback } from 'react';
import {
  addDefaultSrc, formatDate, translateDate,
} from 'utils';
import poster from 'poster';

function PictureOfTheDay({
  entry, currentLanguage, handlePlayAudio, handleCancelAudio, canTTS,
}) {
  const [title, setTitle] = useState(entry.title);
  const [explanation, setExplanation] = useState(entry.explanation);
  const [date, setDate] = useState(translateDate(entry.date, currentLanguage));
  const [largeFont, setLargeFont] = useState(false);
  const translateText = useCallback(async () => {
    if (currentLanguage === 'en') {
      setTitle(entry.title);
      setExplanation(entry.explanation);
      setDate(translateDate(entry.date, 'en'));
      return;
    }
    const formatedDate = formatDate(new Date(entry.date));
    const translatedEntry = await poster(`${process.env.REACT_APP_ENDPOINT}/translations`, {
      title: `${entry.title}.`, desc: `${entry.explanation}`, to: currentLanguage, date: formatedDate,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTitle(translatedEntry.title);
    setExplanation(translatedEntry.desc);
    setDate(translateDate(entry.date, currentLanguage));
  }, [entry, currentLanguage, setTitle, setExplanation, setDate]);

  useEffect(() => {
    translateText();
  }, [currentLanguage, translateText]);

  const setTextSize = () => {
    localStorage.setItem('astroLargeFont', !largeFont);
    setLargeFont(!largeFont);
  };

  useEffect(() => {
    if (localStorage.astroLargeFont === 'true') {
      setLargeFont(true);
    }
  }, []);

  return (
    <div className="max-w-4xl bg-gray-200 rounded-md shadowLg">
      <div className="max-w-screen">
        {entry.url.includes('youtube')
          ? (
            <iframe
              className="w-full aspect-video"
              src={entry.url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          )
          : (
            <img
              className="object-scale-down mx-auto rounded-t-md"
              src={entry.url}
              alt={`Astronomy Pic of the Day ${entry.date}`}
              onError={addDefaultSrc}
            />
          )}
        <div className="grid px-4 py-4 md:px-6">
          <div className="flex items-center mb-2 ">
            <h1 className={`${largeFont ? 'text-2xl' : 'text-xl'} flex-1  font-bold capitalize leading-8 `}>{title}</h1>
            <button type="button" onClick={() => setTextSize()} className="items-center hover:text-gray-700 ">
              <svg className="h-6 pl-5" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 8L4 6L16 6V8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 6L10 18M10 18H12M10 18H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 13.5L14 12L20 12V13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 12V18M17 18H15.5M17 18H18.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {canTTS && (
              <>
                <button type="button" onClick={() => handlePlayAudio(title, explanation)} title="Play" className="items-center ml-3 text-black hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button type="button" onClick={() => handleCancelAudio()} title="stop" className="items-center ml-3 text-black hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <span className={`${largeFont ? 'text-2xl' : 'text-lg'} inline-block mb-2 text-sm font-semibold text-gray-700 capitalize rounded-full`}>{date}</span>
          <p className={`${largeFont ? 'text-2xl' : 'text-lg'} text-gray-900`}>{explanation}</p>
        </div>
        <div className="flex pb-2 ml-4 md:ml-6">
          {entry.hdurl && (
            <a href={entry.hdurl} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 mr-2 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="hidden ml-2 md:flex">HD Version</span>
            </a>
          )}
          {entry.copyright && (
            <span className="inline-block w-40 px-4 py-2 mr-2 text-sm font-semibold text-white bg-gray-400 rounded-md">
              Copyright:
              {entry.copyright}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PictureOfTheDay;

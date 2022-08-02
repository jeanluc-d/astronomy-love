/* eslint-disable max-len */
import React, { useState } from 'react';
import LanguagesDropDown from './NavbarComponents/LanguagesDropDown';
import VoicesDropDown from './NavbarComponents/VoicesDropDown';

function Navbar({
  handleSetLanguage, lang, voices, voiceName, handleOnSetVoice, handleCancelAudio, canTextToSpeechMap,
  languages,
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const onRefresh = () => {
    setIsSpinning(true);
    window.location.reload();
  };

  const handleVoiceSelection = (voiceSynth, index) => {
    handleCancelAudio();
    handleOnSetVoice(voiceSynth, index);
  };

  return (
    <div className="z-50 bg-black navbar " id="myNavbar">
      {/* <div className="relative -mb-2 -md:mb-8">
       <div className="hidden xl:flex ">
          <LanguagesDropDown
            langCodeArr={langCodeArr}
            setLanguage={handleSetLanguage}
            lang={lang}
            canTextToSpeechMap={canTextToSpeechMap}
            styles={{
              position: 'absolute', right: '230px', top: '16px',
            }}
            styles2="bg-black inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-dark border border-gray-300 rounded-md shadow-sm hover:bg-gray-900"
            styles3="bg-black block scrollable-element w-60 h-96 mt-2 overflow-x-hidden overflow-y-auto origin-top-right bg-dark divide-y divide-gray-100 rounded-md shadow-lg w-44 ring-1 ring-black ring-opacity-5 focus:outline-none"
          />
          <VoicesDropDown
            lang={lang}
            voice={voice}
            voices={voices}
            handleOnSetVoice={handleOnSetVoice}
            handleCancelAudio={handleCancelAudio}
            styles={{
              position: 'absolute', right: '100px', top: '16px', width: '100px',
            }}
            styles2="inline-flex justify-center px-7 py-2 text-sm font-medium text-white bg-dark border border-gray-300 rounded-md shadow-sm hover:bg-gray-900"
            styles3="block bg-black h-full mt-2 overflow-x-hidden overflow-y-auto origin-top-right bg-dark divide-y divide-gray-100 rounded-md shadow-lg  max-w-prose w-44 ring-1 ring-black ring-opacity-5 focus:outline-none"
          />
        </div>
      </div> */}
      <footer id="mobile-footer" className="absolute bottom-0 bg-black xl:incet-y-0 xl:bg-transparent mobile-menu-show">
        <div id="mobile-menu">
          <div id="mobile-footer-container" className="flex items-center h-16 ">
            <div className="absolute left-3 md:left-6 bottom-3">
              <LanguagesDropDown
                languages={languages}
                handleSetLanguage={handleSetLanguage}
                lang={lang}
                canTextToSpeechMap={canTextToSpeechMap}
              />
            </div>
            <div className="flex mx-auto xl:hidden">
              <button type="button" onClick={() => onRefresh()} className={`${isSpinning && 'spinner'} fade-in text-center bg-black rounded-full px-2 py-2 border-white border text-white`}>
                <svg className="h-6" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.1679 8C19.6247 4.46819 16.1006 2 11.9999 2C6.81459 2 2.55104 5.94668 2.04932 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C17.2347 22 21.4983 18.0533 22 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="absolute right-3 md:right-6 xl:inset-x-0 xl:left-32 bottom-3">
              <VoicesDropDown
                lang={lang}
                currentVoiceName={voiceName}
                voices={voices}
                handleOnSetVoice={handleOnSetVoice}
                handleCancelAudio={handleCancelAudio}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
}

export default Navbar;

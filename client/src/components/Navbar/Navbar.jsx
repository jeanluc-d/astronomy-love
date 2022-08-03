/* eslint-disable max-len */
import React from 'react';
import LanguagesDropDown from './NavbarComponents/LanguagesDropDown/LanguagesDropDown';
import RefreshButton from './NavbarComponents/RefreshButton/RefreshButton';
import VoicesDropDown from './NavbarComponents/VoicesDropDown/VoicesDropDown';

function Navbar({
  handleSetLanguage, lang, voices, voiceName, handleOnSetVoice, handleCancelAudio, canTextToSpeechMap,
  languages,
}) {
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
            <RefreshButton />
            <div className="absolute right-3 md:right-6 xl:inset-x-0 xl:left-32 bottom-3">
              <VoicesDropDown
                lang={lang}
                currentVoiceName={voiceName}
                voices={voices}
                handleOnSetVoice={handleVoiceSelection}
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

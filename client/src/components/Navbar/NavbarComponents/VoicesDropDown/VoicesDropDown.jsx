/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

function VoicesDropDown({
  currentLanguage, voices, handleOnSetVoice, currentVoiceName, handleCancelAudio,
}) {
  const [availableVoices, setAvailableVoices] = useState(null);
  useEffect(() => {
    if (voices) {
      const voiceArray = [];
      voices?.forEach((voice, index) => {
        const voiceLanguage = `${voice.lang[0]}${voice.lang[1]}`;
        if (voiceLanguage === currentLanguage) {
          voiceArray.push({ voice, index });
        }
      });
      setAvailableVoices(voiceArray);
    }
  }, [currentLanguage, voices]);

  const handleVoiceSelection = (voiceSynth, index) => {
    handleCancelAudio();
    handleOnSetVoice(voiceSynth, index);
  };
  return (
    <Menu as="div" className="inline-block text-left max-h-32 fade-in">
      <div>
        <Menu.Button className="inline-flex justify-center px-8 py-2 text-sm font-medium text-white bg-black border border-gray-300 rounded-md shadow-sm xl:px-2 2xl:px-8 hover:bg-gray-900">
          Voice
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute w-56 overflow-y-auto origin-top-right transform -translate-y-full bg-black divide-y rounded-md shadow-lg -left-28 text-ellipsis h-fit -top-2 ring-1 ring-black">
          <div className="py-1">
            {availableVoices?.length > 0 ? availableVoices?.map((voiceSynth) => (
              <Menu.Item key={voiceSynth.voice.name}>
                {({ active }) => (
                  <button
                    type="button"
                    // eslint-disable-next-line max-len
                    onClick={() => handleVoiceSelection(voiceSynth.voice, voiceSynth.index)}
                    className={`text-white flex text-left px-4 py-2 text-sm w-full hover:bg-gray-700 ${voiceSynth.voice.name === currentVoiceName && 'bg-gray-900 text-white'} ${active && 'bg-gray-900 text-white'}`}
                  >
                    {voiceSynth.voice.name}
                  </button>
                )}
              </Menu.Item>
            )) : (
              <Menu.Item>
                <button
                  type="button"
                  className="flex w-full px-4 py-2 text-sm text-left text-gray-200 hover:bg-gray-700"
                >
                  No voices available
                </button>
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default VoicesDropDown;

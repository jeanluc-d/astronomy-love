/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function LanguagesDropDown({
  handleSetLanguage, currentLanguage, canTextToSpeechMap, languages,
}) {
  return (
    <Menu as="div" className="inline-block w-20 text-left max-h-32 fade-in ">
      <div>
        <Menu.Button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-gray-300 rounded-md shadow-sm xl:px-2 2xl:px-4 hover:bg-gray-900">
          Language
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
        <Menu.Items className="absolute left-0 w-56 overflow-y-auto origin-top-left transform -translate-y-full bg-black divide-y rounded-md shadow-lg h-96 -top-2 ring-1 ring-black">
          <div className="py-1">
            {languages?.length > 0 ? languages.map((language, index) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => handleSetLanguage(language.code, index)}
                    href="#"
                    className={`${active ? 'bg-gray-700 ' : null} flex items-center px-4 py-2 truncate  text-white text-sm w-full ${language.code === currentLanguage && 'bg-gray-900'}`}
                  >
                    {language.name}
                    {canTextToSpeechMap.get(language.code) && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>
                )}
              </Menu.Item>
            )) : (
              <Menu.Item>
                <button
                  type="button"
                  className="flex items-center w-full px-4 py-2 text-sm text-white truncate"
                >
                  No languages available
                </button>
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default LanguagesDropDown;

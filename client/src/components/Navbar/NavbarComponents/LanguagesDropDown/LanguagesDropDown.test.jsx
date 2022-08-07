import { fireEvent, render, screen } from '@testing-library/react';
import LanguagesDropDown from './LanguagesDropDown';
import React from 'react'
import '@testing-library/jest-dom'


describe('Lanague dropdown menu', () => {
  const handleSetLanguage = jest.fn();
  const currentLanguage = "en";
  const canTextToSpeechMap = new Map();
  beforeEach(() => {
    render(<LanguagesDropDown handleSetLanguage={handleSetLanguage} currentLanguage={currentLanguage} canTextToSpeechMap={canTextToSpeechMap} languages={languages} />);
  })
  it('displays language as its label"', () => {
    expect(screen.getByText('Language')).toBeInTheDocument();
  })
  it('displays all the languages after being clicked"', () => {
    fireEvent.click(screen.getByText('Language'));
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument();
    expect(screen.getByText('Hindi')).toBeInTheDocument();
    expect(screen.getByText('Spanish')).toBeInTheDocument();
    expect(screen.getByText('Chinese')).toBeInTheDocument();
    expect(screen.getByText('Arabic')).toBeInTheDocument();
    expect(screen.getByText('Azerbaijani')).toBeInTheDocument();
    expect(screen.getByText('Czech')).toBeInTheDocument();
    expect(screen.getByText('Danish')).toBeInTheDocument();
    expect(screen.getByText('Dutch')).toBeInTheDocument();
    expect(screen.getByText('Esperanto')).toBeInTheDocument();
    expect(screen.getByText('Finnish')).toBeInTheDocument();
    expect(screen.getByText('German')).toBeInTheDocument();
    expect(screen.getByText('Greek')).toBeInTheDocument();
    expect(screen.getByText('Hebrew')).toBeInTheDocument();
    expect(screen.getByText('Hungarian')).toBeInTheDocument();
    expect(screen.getByText('Irish')).toBeInTheDocument();
    expect(screen.getByText('Indonesian')).toBeInTheDocument();
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('Japanese')).toBeInTheDocument();
    expect(screen.getByText('Slovak')).toBeInTheDocument();
    expect(screen.getByText('Swedish')).toBeInTheDocument();
    expect(screen.getByText('Turkish')).toBeInTheDocument();
    expect(screen.getByText('Ukranian')).toBeInTheDocument();
    expect(screen.getByText('Vietnamese')).toBeInTheDocument();
    expect(screen.getByText('Korean')).toBeInTheDocument();
    expect(screen.getByText('Persian')).toBeInTheDocument();
    expect(screen.getByText('Polish')).toBeInTheDocument();
    expect(screen.getByText('Portuguese')).toBeInTheDocument();
    expect(screen.getByText('Russian')).toBeInTheDocument();
  })
  it('clicking a language changes the language', () => {

    fireEvent.click(screen.getByText('Language'));
    fireEvent.click(screen.getByText('English'));
    expect(handleSetLanguage).toHaveBeenCalledTimes(1);
  })
}
);


const languages = [
  {
    "code": "en",
    "name": "English"
  },
  {
    "code": "ar",
    "name": "Arabic"
  },
  {
    "code": "az",
    "name": "Azerbaijani"
  },
  {
    "code": "zh",
    "name": "Chinese"
  },
  {
    "code": "cs",
    "name": "Czech"
  },
  {
    "code": "da",
    "name": "Danish"
  },
  {
    "code": "nl",
    "name": "Dutch"
  },
  {
    "code": "eo",
    "name": "Esperanto"
  },
  {
    "code": "fi",
    "name": "Finnish"
  },
  {
    "code": "fr",
    "name": "French"
  },
  {
    "code": "de",
    "name": "German"
  },
  {
    "code": "el",
    "name": "Greek"
  },
  {
    "code": "he",
    "name": "Hebrew"
  },
  {
    "code": "hi",
    "name": "Hindi"
  },
  {
    "code": "hu",
    "name": "Hungarian"
  },
  {
    "code": "id",
    "name": "Indonesian"
  },
  {
    "code": "ga",
    "name": "Irish"
  },
  {
    "code": "it",
    "name": "Italian"
  },
  {
    "code": "ja",
    "name": "Japanese"
  },
  {
    "code": "ko",
    "name": "Korean"
  },
  {
    "code": "fa",
    "name": "Persian"
  },
  {
    "code": "pl",
    "name": "Polish"
  },
  {
    "code": "pt",
    "name": "Portuguese"
  },
  {
    "code": "ru",
    "name": "Russian"
  },
  {
    "code": "sk",
    "name": "Slovak"
  },
  {
    "code": "es",
    "name": "Spanish"
  },
  {
    "code": "sv",
    "name": "Swedish"
  },
  {
    "code": "tr",
    "name": "Turkish"
  },
  {
    "code": "uk",
    "name": "Ukranian"
  },
  {
    "code": "vi",
    "name": "Vietnamese"
  }
]
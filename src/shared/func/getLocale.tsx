import langData from '@/assets/lang/langs.json';

export type Locale = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  amount: string;
  error: string;
  wallet: string;
  events: {
    event1: string;
    event2: string;
    event3: string;
  };
};

type LangKey = keyof typeof langData;

export const getLocale = (lang: string): Locale => {
  const locales: LangKey[] = ['moldova', 'russian', 'english'];

  if (locales.includes(lang as LangKey)) {
    return langData[lang as LangKey];
  }

  return langData['english'];
};

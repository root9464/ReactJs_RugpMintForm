import FlagMoldova from '@/assets/flag.png';
import { useLanguageStore } from '@/components/Combobox';
import { getLocale } from '@/shared/func/getLocale';
import { useState } from 'react';
import { BodyForm } from './Body';
import { CountdownResult, HeaderForm, Timer } from './Header';
export const FormBlock = () => {
  const [countdownResult, setCountdownResult] = useState<CountdownResult | null>(null);
  const { language } = useLanguageStore();
  const lang = getLocale(language);
  const statusClasses: Record<string, string> = {
    [lang.events.event1]: 'text-blue-700 font-semibold',
    [lang.events.event2]: 'text-teal-700 font-semibold',
    [lang.events.event3]: 'text-gray-700 font-semibold',
  };
  return (
    <div id='mint' className='w-full h-max flex flex-col gap-y-4'>
      <Timer countdownResult={countdownResult} statusClasses={statusClasses} />
      <img src={FlagMoldova} alt='mint' className='w-full h-[400px] rounded-xl' />
      <div id='form_mint' className='w-full h-auto  bg-[#EDEDED] rounded-xl p-5 '>
        <HeaderForm countdownResult={countdownResult} setCountdownResult={setCountdownResult} />
        <BodyForm />
      </div>
    </div>
  );
};

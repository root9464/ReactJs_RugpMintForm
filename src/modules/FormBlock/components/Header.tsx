import { useLanguageStore } from '@/components/Combobox';
import { getCountdownValues } from '@/modules/FormBlock/funcs/TimerEvents';
import { useTimeStore } from '@/modules/FormBlock/store/TIme';
import { getLocale, Locale } from '@/shared/func/getLocale';
import { Temporal } from '@js-temporal/polyfill';
import { Dispatch, SetStateAction, useEffect } from 'react';

export type CountdownResult = {
  dateTime: string;
  status: string;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
};

export const HeaderForm = ({
  countdownResult,
  setCountdownResult,
}: {
  countdownResult: CountdownResult | null;
  setCountdownResult: Dispatch<SetStateAction<CountdownResult | null>>;
}) => {
  const { setTimeStatus } = useTimeStore();

  const { language } = useLanguageStore();
  const lang = getLocale(language);

  useEffect(() => {
    const startDate = Temporal.PlainDate.from({ year: 2024, month: 12, day: 31 });
    const startTime = Temporal.PlainTime.from({ hour: 0, minute: 0 });

    const targetDate = Temporal.PlainDate.from({ year: 2025, month: 1, day: 1 });
    const targetTime = Temporal.PlainTime.from({ hour: 0, minute: 0 });

    const updateCountdown = () => {
      setCountdownResult(getCountdownValues(startDate, startTime, targetDate, targetTime, lang));
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [lang, lang.events]);

  useEffect(() => {
    if (countdownResult?.status === lang.events.event3 || countdownResult?.status === lang.events.event1) {
      setTimeStatus(countdownResult.status);
    }
  }, [countdownResult, lang.events.event1, lang.events.event3, setTimeStatus]);

  const localizedCountdown = countdownResult?.countdown
    ? Object.entries(countdownResult.countdown).reduce((acc, [key, value]) => {
        const localizedKey = lang[key as keyof Locale];
        if (localizedKey) {
          acc[localizedKey as keyof Locale] = value;
        }
        return acc;
      }, {} as Record<string, number>)
    : {};

  return (
    <div className='w-full h-auto font-russoOne'>
      {countdownResult && (
        <>
          <TimerEvents localizedCountdown={localizedCountdown} />
        </>
      )}
    </div>
  );
};

export const Timer = ({
  countdownResult,
  statusClasses,
}: {
  countdownResult: CountdownResult | null;
  statusClasses: Record<string, string>;
}) => (
  <>
    {countdownResult && (
      <div className='w-full h-fit text-lg flex flex-col justify-between items-end md:flex-row md:text-2xl md:items-center smoothness'>
        <h3 className='smoothness'>{countdownResult.dateTime}</h3>
        <h3 className={`${statusClasses[countdownResult.status]} smoothness`}>{countdownResult.status}:</h3>
      </div>
    )}
  </>
);

const TimerEvents = ({ localizedCountdown }: { localizedCountdown: Record<string, number> }) => (
  <div className='w-full h-fit flex flex-row gap-x-2 justify-center mt-5 md:justify-center md:gap-x-[50px]'>
    {Object.entries(localizedCountdown).map(([key, value]) => (
      <div key={key} className='w-full h-fit flex flex-col justify-between text-center gap-y-2 smoothness'>
        <h3 className='text-3xl lg:text-[50px] smoothness font-semibold'>{value}</h3>
        <p className='text-xl text-[#121214] md:text-2xl smoothness'>{key}</p>
      </div>
    ))}
  </div>
);

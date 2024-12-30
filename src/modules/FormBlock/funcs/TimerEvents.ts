import { CountdownResult } from '@/modules/FormBlock/components/Header';
import { Locale } from '@/shared/func/getLocale';
import { Temporal } from '@js-temporal/polyfill';

export const getCountdownValues = (
  startDate: Temporal.PlainDate,
  startTime: Temporal.PlainTime,
  targetDate: Temporal.PlainDate,
  targetTime: Temporal.PlainTime,
  lang: Locale,
): CountdownResult => {
  const moscowTimeZone = Temporal.TimeZone.from('Europe/Moscow');
  const now = Temporal.Now.plainDateTimeISO(moscowTimeZone);
  const startDateTime = startDate.toPlainDateTime(startTime);
  const targetDateTime = targetDate.toPlainDateTime(targetTime);

  const getDuration = (dateTime: Temporal.PlainDateTime) => {
    const duration = now.until(dateTime);
    return {
      days: Math.floor(duration.total({ unit: 'day' })),
      hours: Math.floor(duration.total({ unit: 'hour' }) % 24),
      minutes: Math.floor(duration.total({ unit: 'minute' }) % 60),
      seconds: Math.floor(duration.total({ unit: 'second' }) % 60),
    };
  };

  const dateTimeString = `${startDate.toString()} | ${startTime.toString()} – ${targetDate.toString()} | ${targetTime.toString()}`;

  const timeStatus =
    now.until(startDateTime).total({ unit: 'second' }) > 0
      ? 'start'
      : now.until(targetDateTime).total({ unit: 'second' }) > 0
      ? 'countdown'
      : 'finished';

  switch (timeStatus) {
    case 'start':
      return {
        dateTime: dateTimeString,
        status: lang.events.event1,
        countdown: getDuration(startDateTime),
      };
    case 'countdown':
      return {
        dateTime: dateTimeString,
        status: lang.events.event2,
        countdown: getDuration(targetDateTime),
      };
    case 'finished':
      return {
        dateTime: dateTimeString,
        status: lang.events.event3,
        countdown: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
      };
    default:
      throw new Error('Недопустимое состояние отсчета');
  }
};

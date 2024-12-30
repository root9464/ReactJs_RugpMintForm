import { useTonConnectUI } from '@tonconnect/ui-react';

import { useLanguageStore } from '@/components/Combobox';
import { getLocale } from '@/shared/func/getLocale';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createBodyCellTransaction } from '../funcs/CreateTransaction';
import { useTimeStore } from '../store/TIme';

interface IForm {
  value: number;
}

export const BodyForm = () => {
  // цены на NFT
  const priceNft = 1;

  const [tonConnectUI] = useTonConnectUI();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
  });

  const valueInput = watch('value');

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const transaction = createBodyCellTransaction(priceNft, data.value);
    await tonConnectUI.sendTransaction(transaction);
  };

  const { time } = useTimeStore();

  const isStopEvents = {
    isStopEvent: time.timeStatus === 'Событие завершено',
    isBeforeStartEvent: time.timeStatus === 'До начала события',
  };
  const isStopEventDisable = isStopEvents.isBeforeStartEvent || isStopEvents.isStopEvent;
  const { language } = useLanguageStore();
  const lang = getLocale(language);
  return (
    <div className='w-full h-fit grid grid-cols-1 mt-5 gap-x-[50px] justify-items-stretch md:grid-cols-2'>
      <div className='m-max h-full flex flex-col gap-y-[50px] justify-center order-2 md:order-1 transition-all duration-300 ease-in-out'>
        <form className='flex flex-col gap-y-5 w-full' onSubmit={handleSubmit(onSubmit)}>
          <h3 className='font-bold transition-all duration-300 ease-in-out'>{lang.amount}</h3>
          <input
            type='text'
            min={0}
            placeholder='Enter the number'
            defaultValue={1}
            className='bg-white outline-none w-full h-11 text-[#121214] rounded-lg font-semibold p-3 transition-all duration-300 ease-in-out'
            {...register('value', {
              required: true,
              min: 1,
              max: 10,
              disabled: isStopEventDisable,
            })}
          />

          <div className='flex flex-col gap-1 w-full h-5'>
            {errors.value || Number(valueInput) > 10 ? (
              <p className='text-red-500 font-bold transition-all duration-300 ease-in-out'>{lang.error}</p>
            ) : null}
          </div>

          <button
            type='submit'
            disabled={isStopEventDisable}
            className={`w-full h-11 text-white rounded-lg font-semibold transition-all duration-300 ease-in-out
                      ${isStopEventDisable ? 'bg-[#667286] opacity-50 text-white' : 'bg-[#121214]'}`}>
            {isStopEvents.isStopEvent ? 'Sales discontinued' : isStopEvents.isBeforeStartEvent ? 'Sales not started' : 'Mint nft'}
          </button>
        </form>
      </div>
    </div>
  );
};

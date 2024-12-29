import RomaniaFlagIcon from '@/assets/i.webp';
import { TonConnectButton } from '@tonconnect/ui-react';
import { FormBlock } from './modules/FormBlock/components/Form.module';
export default function App() {
  return (
    <div className='w-full relative p-3 grid grid-rows-[fit-content(1rem)] gap-y-4'>
      <TonConnectButton className='justify-self-end' />
      <FormBlock />

      <img src={RomaniaFlagIcon} className='rounded-lg' alt='' />
    </div>
  );
}

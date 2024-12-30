import { TonConnectButton } from '@tonconnect/ui-react';
import { Combobox } from './components/Combobox';
import { FormBlock } from './modules/FormBlock/components/Form.module';
export default function App() {
  return (
    <div className='w-full relative p-3 grid grid-rows-[fit-content(1rem)] gap-y-4'>
      <div className='flex flex-row justify-between items-center'>
        <Combobox />
        <TonConnectButton />
      </div>

      <FormBlock />
    </div>
  );
}

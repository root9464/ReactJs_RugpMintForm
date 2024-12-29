import { BodyForm } from './Body';
import { HeaderForm } from './Header';

export const FormBlock = () => {
  return (
    <div id='mint' className='w-full h-max'>
      <div id='form_mint' className='w-full h-auto bg-[#EDEDED] rounded-xl p-5 '>
        <HeaderForm />
        <BodyForm />
      </div>
    </div>
  );
};

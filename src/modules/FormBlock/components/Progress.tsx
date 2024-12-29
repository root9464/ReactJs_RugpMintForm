import { useGetItemLimit } from '@/shared/hooks/GetItemLimit';
import { useGetNextItemIndex } from '@/shared/hooks/GetNextItem';
import { motion } from 'framer-motion';

type StackItem = {
  type: 'num' | 'cell';
  num: string;
  cell: string;
};

type ItemLimitData = {
  success: boolean;
  exit_code: number;
  stack: StackItem[];
};

export interface NextItemData extends ItemLimitData {
  decoded: {
    next_item_index: string;
    collection_content: string;
    owner_address: string;
  };
}

export const Progress = () => {
  const { data: next_item_data, isSuccess: isSuccessNextItemData } = useGetNextItemIndex();
  const { data: item_limit_data, isSuccess: isSuccessItemLimitData } = useGetItemLimit();

  const next_item = isSuccessNextItemData && next_item_data ? parseInt(next_item_data.stack[0].num, 16) : 0;
  const item_limit = isSuccessItemLimitData && item_limit_data ? parseInt(item_limit_data.stack[0].num, 16) : 0; //500
  const progressValue = Math.round((next_item / item_limit) * 100);

  return (
    <div className='w-full mt-4 text-uiBorderColor font-semibold text-lg py-1'>
      <p>
        {next_item - 1} <span className='text-white'>/ {item_limit}</span>
      </p>
      <div className='w-full bg-gray-100 rounded-full h-2.5 mb-4 dark:bg-[#9E9EA0]'>
        <motion.div
          className='bg-uiTextLime h-2.5 rounded-full dark:bg-bgColorUIElement'
          initial={{ width: 0 }} // Начальное значение ширины
          whileInView={{
            width: `${progressValue}%`,
            transition: { duration: 1, ease: 'easeInOut' },
          }}
          viewport={{ once: true }}
        />
      </div>
      <p className='text-uiTextLime'>{progressValue}%</p>
    </div>
  );
};

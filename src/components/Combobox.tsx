import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/shared/lib/utils';
import { useState } from 'react';
import { create } from 'zustand';

const languages = [
  {
    value: 'moldova',
    label: 'Moldovan',
  },
  {
    value: 'russian',
    label: 'Russian',
  },
  {
    value: 'english',
    label: 'English',
  },
];

type IStoreLanguage = {
  language: string;
  setLanguage: (lang: string) => void;
};

export const useLanguageStore = create<IStoreLanguage>((set) => ({
  language: 'moldova',
  setLanguage: (lang) => set({ language: lang }),
}));

export function Combobox() {
  const [open, setOpen] = useState(false);

  const { language, setLanguage } = useLanguageStore();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button role='combobox' aria-expanded={open} className='w-[200px] bg-[#121214] justify-between'>
          {language ? languages.find((lang) => lang.value === language)?.label : 'Select a language'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList className='bg-[#121214]'>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.value}
                  className={`cursor-pointer text-white  ${language === lang.value ? 'bg-[#2F2F31]' : ''}`}
                  onSelect={(currentValue) => {
                    setLanguage(currentValue === language ? '' : currentValue);
                    setOpen(false);
                  }}>
                  {lang.label}
                  <Check className={cn('ml-auto', language === lang.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

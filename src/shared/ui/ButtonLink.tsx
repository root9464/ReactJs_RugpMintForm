import Image from 'next/image';
import Link from 'next/link';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

type ButtonLinkProps = {
  href: string;
  img: string;
  text: string;
  width?: number;
  height?: number;
} & Partial<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>;

export const ButtonLink: FC<ButtonLinkProps> = ({ href, img, text, height = 30, width = 30, ...props }) => (
  <Link
    href={href}
    scroll={props.disabled ? false : true}
    className='w-max h-10 flex flex-row justify-center items-center gap-x-3 bg-[#06335B] py-1 px-[18px] rounded-uiDefault'>
    {text}
    <Image src={img} alt='xrocket' width={width} height={height} />
  </Link>
);

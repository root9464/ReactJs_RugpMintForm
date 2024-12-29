'use client';

import { motion } from 'framer-motion';

export const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const textSplit = text.split('');

  const container = {
    hidden: {
      opacity: 0,
    },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1 * i,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: -20,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div variants={container} initial='hidden' animate='visible' className='flex flex-row items-center justify-center'>
      {textSplit.map((textCharacter, index) => (
        <motion.span variants={child} key={index} className={className}>
          {textCharacter === ' ' ? '\u00a0' : textCharacter}
        </motion.span>
      ))}
    </motion.div>
  );
};

import { FC } from 'react';

type HighlightTextProps = {
  text: string;
  marker: string;
  highlightClassName?: string; // Дополнительно можно передавать CSS класс для выделения
  className?: string;
};

export const HighlightText: FC<HighlightTextProps> = ({ text, marker, highlightClassName = 'text-uiTextLime font-bold', className }) => {
  // Разделяем текст на части: маркер и остальной текст
  const regex = new RegExp(`(${marker})`, 'gi'); // Регулярное выражение для поиска всех вхождений маркера
  const parts = text.split(regex); // Разделяем текст по маркеру

  return (
    <p className={`${className}`}>
      {parts.map((part, index) =>
        part.toLowerCase() === marker.toLowerCase() ? (
          <span key={index} className={`${highlightClassName}`}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </p>
  );
};

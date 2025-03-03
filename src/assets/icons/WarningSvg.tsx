import { FC } from 'react';

interface SvgProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const WarningSvg: FC<SvgProps> = ({
  width = 22,
  height = 22,
  fill = "none",
}) => {
  return (
    <svg width={width} height={height} fill={fill}>
      <path d="M10.9998 5.491L17.9023 17.4168H4.09734L10.9998 5.491ZM10.9998 1.8335L0.916504 19.2502H21.0832L10.9998 1.8335ZM11.9165 14.6668H10.0832V16.5002H11.9165V14.6668ZM11.9165 9.16683H10.0832V12.8335H11.9165V9.16683Z" fill="#FF5D02"/>
    </svg>
  );
}
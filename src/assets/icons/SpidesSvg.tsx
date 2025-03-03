import { FC } from 'react';

interface SvgProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const SpidesSvg: FC<SvgProps> = ({
  width = 35,
  height = 31,
  fill = "none",
}) => {
  return (
    <svg width={width} height={height} fill={fill}>
      <path d="M0 17.555L5.72301 24.8683V11.7033L17.169 24.8683H28.615L34.338 17.555L17.169 0L0 17.555ZM22.892 30.72L17.169 24.8683L11.446 30.72H22.892Z" fill="#242529"/>
    </svg>
  );
}
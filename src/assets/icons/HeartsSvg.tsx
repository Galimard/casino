import { FC } from 'react';

interface SvgProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const HeartsSvg: FC<SvgProps> = ({
  width = 44,
  height = 31,
  fill = "none",
}) => {
  return (
    <svg width={width} height={height} fill={fill}>
      <path d="M35.9566 0.279785V16.5433L21.629 0.279785H7.30147L0.137695 9.31508L21.629 30.9998L43.1203 9.31508L35.9566 0.279785Z" fill="#ED1E24"/>
    </svg>
  );
}
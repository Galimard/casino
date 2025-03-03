import { FC } from 'react';

interface SvgProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const DiamondsSvg: FC<SvgProps> = ({
  width = 32,
  height = 31,
  fill = "none",
}) => {
  return (
    <svg width={width} height={height} fill={fill}>
      <path d="M0.337891 15.6406V0.279785H15.8206L0.337891 15.6406Z" fill="#ED1E24"/>
      <path d="M15.8206 30.9998L0.337891 15.6406V30.9998H15.8206Z" fill="#ED1E24"/>
      <path d="M31.3034 15.6406L15.8206 0.279785H31.3034V15.6406Z" fill="#ED1E24"/>
      <path d="M31.3034 15.6406L15.8206 30.9998H31.3034V15.6406Z" fill="#ED1E24"/>
    </svg>
  );
}
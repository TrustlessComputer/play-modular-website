import { ReactSVG } from 'react-svg';
import React from 'react';

type IProps = {
  svgUrl: string;
  className?: string;
  size?: number | string;
  height?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const SvgInset: React.FC<IProps> = ({
  svgUrl,
  className,
  size,
  height,
  onClick,
  fullWidth = false,
  style,
}) => {
  return (
    <ReactSVG
      onClick={onClick}
      className={className}
      src={svgUrl}
      style={style}
      beforeInjection={(svg): void => {
        if (size) {
          svg.setAttribute('height', `100%`);
          svg.setAttribute('width', `${fullWidth ? '100%' : size}`);
          svg.style.maxWidth = `${size}`;
          svg.style.minHeight = `100%`;
          svg.style.width = `${fullWidth ? '100%' : size}`;
          svg.style.height = height ? height : `100%`;
        }
      }}
    />
  );
};

export default SvgInset;

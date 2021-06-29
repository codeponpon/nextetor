import React from "react";
import Image from "next/image";

interface Props {
  width: number;
  height: number;
}

const Logo = ({ width, height }: Props) => {
  if (!width || !height) {
    height = width = 200;
  }

  return (
    <Image width={width} height={height} src="/images/logo.png" alt="Logo" />
  );
};

export default Logo;

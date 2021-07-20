import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  width: number;
  height: number;
}

const Logo: React.FC<Props> = ({ width = 200, height = 200 }) => {
  const router = useRouter();

  return (
    <Image
      width={width}
      height={height}
      src={`${router.basePath}/images/logo.png`}
      alt="Logo"
    />
  );
};

export default Logo;

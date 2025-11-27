"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Images({
  size = 25,
  src,
  alt = "/image",
  rounded = false,
}: {
  size?: number;
  src: string;
  alt?: string;
  rounded?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(null);
  const loadImg = (value: any) => {
    setImgSrc(value);
  };

  return (
    <div className="relative w-full h-full">
      <Image
        // fill
        objectFit="scale-down"
        src={`${imgSrc ? imgSrc : "/images/spinner.gif"}`}
        alt={alt}
        onLoadingComplete={() => loadImg(src)}
        width={size}
        height={size}
        unoptimized
        className={`bg-contain ${rounded ? "rounded-full" : ""}`}
      />
    </div>
  );
}

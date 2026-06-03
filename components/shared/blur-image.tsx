"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

function shimmer(w: number, h: number) {
  return `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#e5e7eb" stop-opacity="1"/>
          <stop offset="50%" stop-color="#f3f4f6" stop-opacity="1"/>
          <stop offset="100%" stop-color="#e5e7eb" stop-opacity="1"/>
          <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="1.4s" repeatCount="indefinite"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>
    </svg>`;
}

function toBase64(str: string) {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
}

const BLUR_DATA_URL = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;

type BlurImageProps = Omit<ImageProps, "placeholder" | "blurDataURL">;

export function BlurImage({ className, ...props }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      className={[
        "transition-opacity duration-500 ease-in-out",
        loaded ? "opacity-100" : "opacity-0",
        className ?? "",
      ]
        .join(" ")
        .trim()}
      onLoad={() => setLoaded(true)}
    />
  );
}

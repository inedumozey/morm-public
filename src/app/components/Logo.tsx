import React from "react";
import Images from "./Image";

export function LogoImage({ size = 50 }: { size?: number }) {
  return <Images size={size} src="/images/rillbill.png" />;
}

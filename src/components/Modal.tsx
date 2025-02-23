"use client";

import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export function PreventScrolling() {
  useLayoutEffect(() => {
    document.querySelector("body")!.classList.add("overflow-hidden");

    return () => {
      document.querySelector("body")!.classList.remove("overflow-hidden");
    };
  }, []);

  return null;
}

export function RouterBack() {
  const router = useRouter();

  return (
    <>
      <div
        className="absolute inset z-10 cursor-pointer"
        onClick={router.back}
      ></div>
    </>
  );
}

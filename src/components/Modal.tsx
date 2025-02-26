"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useLayoutEffect } from "react";

export function PreventScrolling() {
  useLayoutEffect(() => {
    document.querySelector("body")!.classList.add("overflow-hidden");

    return () => {
      document.querySelector("body")!.classList.remove("overflow-hidden");
    };
  }, []);

  return null;
}

export function RouterBack({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <div
        className={[
          className ? className : "absolute inset  cursor-pointer",
        ].join(" ")}
        onClick={router.back}
      >
        {children}
      </div>
    </>
  );
}

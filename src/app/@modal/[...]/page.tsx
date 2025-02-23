import { PreventScrolling, RouterBack } from "@/components/Modal";
import React from "react";

type Request = {
  searchParams: {
    modal: string;
    [key: string]: string;
  };
};

function page(request: Request) {
  if (request.searchParams.modal && request.searchParams.modal! == "") {
    return (
      <>
        <div className="fixed bg-black/80 inset-0 flex items-center justify-center">
          <div className="bg-white max-w-xl p-4 rounded-2xl min-h-44 relative z-20">
            {/* Tangkap searchParams di sini */}
          </div>
          <RouterBack />
        </div>
        <PreventScrolling />
      </>
    );
  }
  return null;
}

export default page;

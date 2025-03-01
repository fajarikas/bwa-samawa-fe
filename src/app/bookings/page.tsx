import Image from "next/image";
import React from "react";
import Form from "./Form";

type Props = {};

function page({}: Props) {
  return (
    <>
      <section className="absolute w-full z-10 top-0 flex h-screen">
        <div className="w-6/12 min-h-screen relative ml-auto">
          <Image
            fill
            className="w-full h-full object-cover absolute"
            src="/images/booking-page.png"
            alt="booking-page"
            sizes=""
          />
        </div>
      </section>

      <section className="container mx-auto relative z-20 flex mt-10">
        <Form />
      </section>
    </>
  );
}

export default page;

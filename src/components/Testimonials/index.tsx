import React from "react";

import { TTestimonial } from "./types";
import Slider from "@/components/Slider";
import Star from "@/assets/images/star.svg";
import Image from "next/image";
import { getData } from "./actions";

export function Content({ data }: { data: TTestimonial }) {
  return (
    <div className="relative">
      <div className="flex flex-col border p-7 rounded-3xl gap-y-4">
        <span className="flex gap-x-1 text-color3">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </span>

        <p className="">{data.message}</p>

        <span className="flex gap-x-4 items-center">
          <span className="relative w-[80px] aspect-square rounded-full overflow-hidden">
            <Image
              fill
              className="w-full h-full object-cover absolute"
              src={`${process.env.HOST_API_STORAGE}/${data.photo}`}
              alt={data.name}
            />
          </span>
          <span className="flex flex-col">
            <span className="text-xl font-bold">{data.name}</span>
            <span className="">{data.occupation}</span>
          </span>
        </span>
      </div>
    </div>
  );
}

async function Testimonials() {
  const { data }: { data: TTestimonial[] } = await getData();

  return (
    <div className="relative pb-16">
      <Slider
        swiperClassName="w-full"
        swiperSliderClassName="!w-[340px] -mx-2 px-6"
      >
        {data.map((testy) => {
          return <Content key={testy.id} data={testy} />;
        })}
      </Slider>
    </div>
  );
}

export default Testimonials;

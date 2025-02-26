"use client";

import React, { useState } from "react";
import Popular from "@/assets/images/popular2.svg";
import Brochure from "@/assets/images/brochure.svg";
import Play from "@/assets/images/play.svg";
import Image from "next/image";
type Props = {
  title: string;
  data: {
    id: number;
    photo: string;
  }[];
  isPopular: boolean;
};

function Slides({ data, title, isPopular }: Props) {
  const photos = data.slice(0, 3);

  const [current, setCurrent] = useState(photos[0].id);

  const currentPhoto = photos.find((photo) => photo.id === current);
  return (
    <div className="grid grid-cols-4 gap-5 grid-rows-3 h-[550px]">
      <div className="col-span-3 row-span-3">
        <span className="flex relative w-full h-full rounded-2xl overflow-hidden">
          <span className="absolute z-10 top-5 left-5">
            <span className="bg-light1 rounded-full inline-flex gap-x-2 items-center text-sm py-1 px-3 font-bold uppercase">
              <span className="text-color2">
                <Popular />
              </span>
              Popular
            </span>
          </span>

          <span className="absolute z-10 bottom-5 left-5">
            <span className="bg-light1 rounded-full inline-flex gap-x-2 items-center text-sm py-1 px-3 font-bold uppercase">
              <span className="text-color2">
                <Brochure />
              </span>
              BROCHURE .PDF
            </span>
          </span>

          <span className="absolute z-10 bottom-5 right-5">
            <span className="bg-light1 rounded-full inline-flex gap-x-2 items-center text-sm py-1 px-3 font-bold uppercase">
              <span className="text-color2">
                <Play />
              </span>
              VIRTUAL 360
            </span>
          </span>

          <Image
            fill
            className="w-full h-full object-cover absolute"
            src={`${process.env.NEXT_PUBLIC_HOST_API_STORAGE}/${currentPhoto?.photo}`}
            alt={`${title}0`}
          />
        </span>
      </div>

      {photos.map((photo) => {
        return (
          <div
            key={photo.id}
            className="border-2 cursor-pointer border-transparent hover:border-color2 rounded-2xl overflow-hidden"
            onClick={() => setCurrent(photo.id)}
          >
            <span className="flex relative w-full h-full">
              {}
              <Image
                fill
                className="w-full h-full object-cover absolute"
                src={`${process.env.NEXT_PUBLIC_HOST_API_STORAGE}/${photo.photo}`}
                alt={`${title}-${photo.photo}`}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Slides;

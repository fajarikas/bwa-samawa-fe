import React from "react";

import { TPackage, TShow } from "./types";
import Slider from "@/components/Slider";
import { getData } from "./actions";
import Popular from "@/assets/images/popular.svg";
import PinPoint from "@/assets/images/pinpoint.svg";
import HomeTown from "@/assets/images/hometown.svg";
import Image from "next/image";
import thousands from "@/libs/thousands";
import Link from "next/link";

type PropsWeddingPackagesWrapper = {
  show: TShow;
  type: "grid" | "slider";
};

function WeddingPackageGrid({ data }: { data: TPackage[] }) {
  return (
    <div className="grid grid-cols-4 gap-7">
      {data.map((weddingPackage) => {
        return (
          <div className="flex flex-col gap-y-4 relative">
            <Link
              href={`${process.env.HOST_APP}/packages/${weddingPackage.slug}`}
              className="absolute inset-0 z-10"
            >
              {/* Link here */}
            </Link>
            <span className="relative h-[300px] rounded-3xl overflow-hidden">
              {weddingPackage.isPopular === 1 && (
                <span className="absolute z-10 top-5 left-5">
                  <span className="bg-color1 rounded-full text-light1 inline-flex gap-x-2 items-center text-sm py-1 px-3 uppercase">
                    <Popular />
                    Popular
                  </span>
                </span>
              )}
              <Image
                fill
                className="w-full h-full object-cover object-center"
                src={`${process.env.HOST_API_STORAGE}/${weddingPackage.thumbnail}`}
                alt={weddingPackage.name}
                sizes="(max-width: 768px) 100vw"
              />
            </span>
            <h6 className="text-xl font-bold">{weddingPackage.name}</h6>
            <span className="flex flex-col gap-[14px]">
              <span className="flex gap-x-2 items-center">
                <PinPoint />
                {weddingPackage.city.name}
              </span>
              <span className="flex gap-x-2 items-center">
                <HomeTown />
                Tentram
              </span>
            </span>
            <span className="text-color2 font-bold">
              Rp {thousands(weddingPackage.price)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function WeddingPackageSlider({ data }: { data: TPackage[] }) {
  return (
    <div className="relative">
      <Slider
        swiperClassName="  w-full h-[480px]"
        swiperSliderClassName="-mx-10 px-12 xl:max-w-5xl 2xl:max-w-7xl"
      >
        {data.map((slide) => {
          return (
            <div
              key={slide.id}
              className=" h-full rounded-3xl overflow-hidden relative"
            >
              <figure className="w-full h-full absolute">
                <Image
                  fill
                  className="w-full h-full object-cover object-center"
                  src={`${process.env.HOST_API_STORAGE}/${slide.thumbnail}`}
                  alt="wedding package 1"
                  sizes="(max-width: 768px) 100vw"
                />
              </figure>
              <div className="card-slide-content flex flex-col items-start gap-y-5">
                <span className="bg-color1 rounded-full text-light1 inline-flex gap-x-2 items-center text-sm py-1 px-3 uppercase">
                  <Popular />
                  Popular
                </span>
                <span className="flex flex-col gap-y-1">
                  <h6 className="text-[28px] font-bold">{slide.name}</h6>
                  <span className="text-xl text-color2 font-semibold">
                    Rp {thousands(slide.price)}
                  </span>
                </span>
                <span className="flex gap-x-4">
                  <span className="flex gap-x-2 items-center">
                    <PinPoint />
                    {slide.city.name}
                  </span>
                  <span className="flex gap-x-2 items-center">
                    <HomeTown />
                    {slide.weddingOrganizer.name}
                  </span>
                </span>
                <Link
                  href={`${process.env.HOST_APP}/packages/${slide.slug}`}
                  className="flex justify-center bg-color2 py-2 w-full text-light1 rounded-full"
                >
                  View Package
                </Link>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

async function WeddingPackagesWrapper({
  show,
  type,
}: PropsWeddingPackagesWrapper) {
  const { data }: { data: TPackage[] } = await getData(show);

  if (type === "grid") {
    return <WeddingPackageGrid data={data} />;
  }
  if (type === "slider") {
    return <WeddingPackageSlider data={data} />;
  }
  return null;
}

export default WeddingPackagesWrapper;

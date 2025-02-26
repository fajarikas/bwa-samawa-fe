import Header from "@/components/Header";
import { TPackage } from "@/components/WeddingPackages/types";
import { Content as ContentBonus } from "@/components/Bonus";
import { Content as ContentTestimony } from "@/components/Testimonials";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import Star from "@/assets/images/star.svg";
import Pinpoint from "@/assets/images/pinpoint.svg";
import Popular from "@/assets/images/popular.svg";
import Checkmark from "@/assets/images/check-mark.svg";
import thousands from "@/libs/thousands";
import Link from "next/link";
import Slides from "./Slides";

type Request = {
  params: {
    packagesSlug: string;
  };
};

async function getData(slug: string) {
  try {
    const req = await fetch(
      `${process.env.HOST_API}/api/wedding-package/${slug}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    return req.json();
  } catch (error) {
    console.log("🚀 ~ getData ~ error:", error);
  }
}

export async function generateMetadata(
  { params }: Request,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { packagesSlug } = params;

  // fetch data
  const { data: packages }: { data: TPackage } = await getData(packagesSlug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: packages.name,
    openGraph: {
      images: [
        `${process.env.HOST_API_STORAGE}/${packages.thumbnail}`,
        ...previousImages,
      ],
    },
  };
}

async function PackageDetailsPage({ params }: Request) {
  const { data: details }: { data: TPackage } = await getData(
    params.packagesSlug
  );
  console.log("🚀 ~ PackageDetailsPage ~ details:", details);

  return (
    <main className="flex flex-col gap-y-8 relative pb-16">
      <Header />

      <section className="container mx-auto flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <span className="flex flex-col">
            <h2 className="text-3xl font-bold">{details.name}</h2>
            <span className="flex gap-x-2 items-center">
              <Pinpoint className="text-color1" />
              {details.city.name}
            </span>
          </span>

          <span className="flex flex-col items-end gap-y-2">
            <span className="flex gap-x-1 text-color3">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </span>
            <span className="font-bold">
              {thousands(details.weddingTestimonials?.length)}
            </span>
          </span>
        </div>

        <Slides
          data={details.photos}
          title={details.name}
          isPopular={details.isPopular === 1}
        />
      </section>

      <section className="container mx-auto">
        <div className="flex gap-x-8">
          <div className="w-8/12 flex flex-col gap-y-7">
            <div className="flex flex-col">
              <h6 className="font-bold text-xl">It's a Good Package</h6>
              <p className="leading-normal">{details.about}</p>
            </div>

            <div className="flex flex-col gap-y-4">
              <h6 className="font-bold text-xl">Bonus Included</h6>
              {details.weddingBonusPackages?.map((bonus) => {
                return (
                  <ContentBonus key={bonus.id} data={bonus.bonusPackage} />
                );
              })}
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <h6 className="font-bold text-xl">Wedding Testimonials</h6>
                <Link
                  href="/"
                  className="border border-dark1 px-5 py-3 rounded-full font-semibold"
                >
                  View Details
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {details.weddingTestimonials.map((testy) => {
                  return <ContentTestimony data={testy} key={testy.id} />;
                })}
              </div>
            </div>
          </div>

          <div className="w-4/12">
            <div className="sticky top-8">
              <div className="border p-7 flex flex-col gap-y-5 rounded-2xl">
                <h6 className="text-3xl text-color2 font-bold">
                  {thousands(details.price)}
                </h6>
                <hr />
                <ul className="flex flex-col gap-y-5 list-none">
                  <li className="flex items-center gap-x-3">
                    <Checkmark className="text-color2" />
                    <span className="">
                      Lorem ipsum dolor si amet nikah berkah dunia kita
                    </span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <Checkmark className="text-color2" />

                    <span className="">
                      Lorem ipsum dolor si amet nikah berkah dunia kita
                    </span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <Checkmark className="text-color2" />

                    <span className="">
                      Lorem ipsum dolor si amet nikah berkah dunia kita
                    </span>
                  </li>
                </ul>
                <hr />
                <h6 className="font-bold">Wedding Organizer</h6>
                {/* <div className="flex border border-light3 hover:border-color2 transition-colors duration-300 bg-light1 p-5 rounded-3xl items-center gap-x-5 relative">
                  <span className="relative w-[80px] aspect-square rounded-full overflow-hidden">
                    <img
                      src="/images/image 5.png"
                      alt="wedding 2"
                      className="w-full h-full object-cover absolute"
                    />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xl font-bold">Dian Putri</span>
                    <span className="">194 Packages</span>
                  </span>
                  <a href="/organizers.html" className="absolute inset-0"></a>
                </div> */}
                <hr />
                <a
                  href="/checkout.html"
                  className="flex justify-center bg-color2 py-4 w-full text-light1 rounded-full"
                >
                  Choose This Package
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PackageDetailsPage;

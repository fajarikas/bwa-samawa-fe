import Header from "@/components/Header";
import { TPackage } from "@/components/WeddingPackages/types";
import React from "react";
import { getData } from "../action";
import Image from "next/image";
import thousands from "@/libs/thousands";
import { Content as ContentTestimony } from "@/components/Testimonials";
import { Content as ContentOrganizer } from "@/components/Organizer";
import Form from "./Form";

type Request = {
  params: {
    packagesSlug: string;
  };
};

async function PackageCheckoutPage({ params }: Request) {
  const { data: details }: { data: TPackage } = await getData(
    params.packagesSlug
  );
  return (
    <main className="flex flex-col gap-y-8 relative py-8 bg-light2">
      <Header hasPadding />
      <section className="container mx-auto flex flex-col gap-y-4">
        <h2 className="text-3xl font-bold">Checkout Package</h2>

        <div className="flex gap-x-12">
          <div className="w-8/12">
            <Form data={details} />
          </div>
          <div className="w-4/12">
            <div className="sticky top-8">
              <div className="bg-light1 p-7 flex flex-col gap-y-5 rounded-2xl">
                <h6 className="text-2xl font-bold">{details.name}</h6>
                <span className="relative w-full aspect-video rounded-2xl overflow-hidden">
                  <Image
                    fill
                    className="w-full h-full object-cover absolute"
                    src={`${process.env.NEXT_PUBLIC_HOST_API_STORAGE}/${details.thumbnail}`}
                    alt={details.name}
                    sizes=""
                  />
                </span>

                <h6 className="text-2xl text-color2 font-bold">
                  Rp {thousands(details.price)}
                </h6>
                <hr />
                <h6 className="font-bold">Happy Story</h6>
                {details.weddingTestimonials.length > 0 ? (
                  <ContentTestimony data={details.weddingTestimonials[0]} />
                ) : (
                  <p>Belum ada testimonial</p>
                )}

                <hr />
                <h6 className="font-bold">Wedding Organizer</h6>
                <ContentOrganizer data={details.weddingOrganizer} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PackageCheckoutPage;

export type TShow = "popular" | "newest";
import { TCity } from "@/components/Cities/types";
import { TOrganizer } from "@/components/Organizer/types";
import { TTestimonial } from "@/components/Testimonials/types";

export type TPackage = {
  id: number;
  name: string;
  slug: string;
  price: number;
  isPopular: 1 | 0;
  thumbnail: string;
  about: string;
  city: TCity;
  weddingOrganizer: TOrganizer;
  photos: {
    id: number;
    photo: string;
  }[];
  weddingBonusPackages: {
    id: number;
    bonusPackage: TBonus;
  }[];
  weddingTestimonials: TTestimonial[];
};

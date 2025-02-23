"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Logo from "@/assets/images/logo-samawa.svg";
import Link from "next/link";

type Props = {};

function Header({}: Props) {
  const pathName = usePathname();
  // console.log("🚀 ~ Header ~ pathName:", pathName);
  const mainMenus = [
    {
      key: "homePage",
      label: "Home",
      slug: "/",
    },
    {
      key: "category",
      label: "Category",
      slug: "/categories",
    },
    {
      key: "package",
      label: "Package",
      slug: "/package",
    },
    {
      key: "testimonial",
      label: "testimonial",
      slug: "/testimonials",
    },
  ];
  return (
    <header className="flex justify-between container mx-auto items-center pt-8 -mb-8">
      <span className="flex gap-x-3 items-center">
        <span className="text-color2">
          <Logo />
        </span>
        <span className="text-2xl font-bold cursor-default">Samawa</span>
      </span>
      <ul className="flex gap-x-10">
        {mainMenus.map((menu) => {
          let isActive = false;
          if (!!menu.slug) {
            if (
              pathName === menu.slug ||
              (pathName.startsWith(menu.slug) &&
                pathName.charAt(menu.slug.length) === "/")
            )
              isActive = true;
          }
          return (
            <li key={menu.key}>
              <Link
                href={menu.slug}
                className={[
                  "hover:underline",
                  isActive ? "font-bold" : "",
                ].join(" ")}
                aria-current={isActive ? "true" : "false"}
              >
                {menu.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="flex gap-x-4">
        <li>
          <Link
            href="/contacts"
            className="border border-dark1 px-5 py-3 rounded-full font-semibold"
          >
            Contact Us
          </Link>
        </li>
        <li>
          <a
            href="/bookings"
            className="border transparent bg-color2 text-light1 px-5 py-3 rounded-full font-semibold"
          >
            My Booking
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;

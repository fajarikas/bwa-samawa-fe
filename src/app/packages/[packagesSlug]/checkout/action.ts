"use server";

import { redirect } from "next/navigation";

interface File {
  size: number;
  type: string;
  name: string;
  lastModified: number;
}
export async function booking(prevState: any, formData: FormData) {
  console.log(formData);
  if (formData.get("name") === "") {
    return {
      message: "Field name should have a value",
      status: 400,
    };
  }
  if (formData.get("email") === "") {
    return {
      message: "Field email should have a value",
      status: 400,
    };
  }
  if (formData.get("phone") === "") {
    return {
      message: "Field phone should have a value",
      status: 400,
    };
  }
  if (formData.get("started_at") === "") {
    return {
      message: "Field date should have a value",
      status: 400,
    };
  }
  if (formData.get("started_at") === "") {
    return {
      message: "Field date should have a value",
      status: 400,
    };
  }
  const files = formData.get("proof") as File;
  if (files.size === 0) {
    return {
      message: "Choose proof of payment",
      status: 400,
    };
  }

  console.log("proof", formData.get("proof"));

  const res = await fetch(`${process.env.HOST_API}/api/booking-transaction`, {
    method: "POST",
    body: formData,
  });

  //   console.log("🚀 ~ booking ~ res:", res);

  //   const data = await res.json();
  //   console.log("🚀 ~ booking ~ data:", data);

  //   return redirect(`/packages/${formData.get("slug")}/checkout/success`);
  try {
    await fetch(`${process.env.HOST_API}/api/booking-transaction`, {
      method: "POST",
      body: formData,
    });

    // Kembalikan URL tujuan, JANGAN langsung redirect di sini
    return {
      status: 200,
      redirectUrl: `/packages/${formData.get("slug")}/checkout/success`,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { message: "Something went wrong", status: 500 };
  }
}

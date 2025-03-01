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

  // const res = await fetch(`${process.env.HOST_API}/api/booking-transaction`, {
  //   method: "POST",
  //   body: formData,
  // });

  // const data = await res.json();

  // return redirect(
  //   `/packages/${formData.get("slug")}/checkout/success?bookingId=${
  //     data.data.booking_trx_id
  //   }`
  // );
  try {
    const res = await fetch(`${process.env.HOST_API}/api/booking-transaction`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("🚀 ~ booking ~ res:", data);

    return {
      status: 200,
      redirectUrl: `/packages/${formData.get(
        "slug"
      )}/checkout/success?bookingId=${data.data.booking_trx_id}`,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { message: "Something went wrong", status: 500 };
  }
}

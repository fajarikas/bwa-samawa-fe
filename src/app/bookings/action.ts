import { redirect } from "next/navigation";

export async function checkBooking(prevState: any, formData: FormData) {
  if (formData.get("phone") === "") {
    return {
      message: "Field name should have a value",
      status: 400,
    };
  }
  if (formData.get("booking_trx_id") === "") {
    return {
      message: "Field email should have a value",
      status: 400,
    };
  }

  // return {
  //   status: 200,
  //   redirectUrl: `/bookings/${formData.get(
  //     "booking_trx_id"
  //   )}?phone=${formData.get("phone")}`,
  // };

  return redirect(
    `/bookings/${formData.get("booking_trx_id")}?phone=${formData.get("phone")}`
  );
}

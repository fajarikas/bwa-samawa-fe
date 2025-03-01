"use client";

import React, { useEffect } from "react";
import CodeIcon from "@/assets/images/code.svg";
import PhoneIcon from "@/assets/images/phone.svg";
import { useFormState, useFormStatus } from "react-dom";
import { checkBooking } from "./action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {};
const initialState: {
  message: string;
  status: 400 | 200;
} = {
  message: "",
  status: 200,
};

function Form({}: Props) {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(checkBooking, initialState);
  const router = useRouter();

  // useEffect(() => {
  //   if (state && state.status === 404) {
  //     toast.error(state.message);
  //   } else if (state && state.status === 200 && state.redirectUrl) {
  //     toast.success(state.message);
  //     router.push(state.redirectUrl);
  //   }
  // }, [state]);

  useEffect(() => {
    if (state.status === 400) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form
      action={formAction}
      className="bg-light1 rounded-2xl flex flex-col gap-y-5 w-4/12 p-5"
    >
      <h1 className="text-xl font-bold">Check My Booking</h1>

      <div className="flex flex-col w-full gap-y-2">
        <label htmlFor="booking_trx_id">Booking ID</label>
        <div className="flex relative">
          <span className="absolute left-0 bottom-0 top-0 aspect-square flex items-center justify-center text-color2">
            <CodeIcon />
          </span>
          <input
            type="text"
            className="pl-10 w-full py-3 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-full"
            name="booking_trx_id"
            id="booking_trx_id"
            placeholder="Write your booking id"
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-y-2">
        <label htmlFor="phone">Phone Number</label>
        <div className="flex relative">
          <span className="absolute left-0 bottom-0 top-0 aspect-square flex items-center justify-center text-color2">
            <PhoneIcon />
          </span>
          <input
            type="text"
            className="pl-10 w-full py-3 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-full"
            name="phone"
            id="phone"
            placeholder="Gunakan phone number saat Anda register"
          />
        </div>
      </div>
      <button
        disabled={pending}
        aria-disabled={pending}
        type="submit"
        className={[
          " font-semibold gap-x-2 flex items-center justify-center py-3 rounded-full w-full ",
          pending
            ? " bg-color2/25 text-gray-600 pointer-events-none cursor-not-allowed"
            : "bg-color2 text-light1 ",
        ].join(" ")}
      >
        <span>Find Boooking Details</span>
      </button>
    </form>
  );
}

export default Form;

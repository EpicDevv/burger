"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      type="button"
      className="inline-flex items-center gap-x-2 rounded-md bg-[#008170] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#005B41] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
    >
      <ArrowLeftCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
      Go Back
    </button>
  );
}

"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="h-screen">
      <div className="mx-auto my-4 flex max-w-xl text-black  dark:text-white flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12">
        <h2 className="text-xl font-bold">Oh no!</h2>
        <p className="my-2">
          There was an issue with our storefront. This could be a temporary
          issue, please try your action again.
        </p>
        <button
          className="mx-auto mt-4 flex w-full items-center bg-[#008170] justify-center rounded-full  p-4 tracking-wide text-white hover:opacity-90"
          onClick={() => reset()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

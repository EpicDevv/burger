import { XCircleIcon } from "@heroicons/react/20/solid";

export default function Example() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="rounded-md -mt-40 dark:bg-red-200 bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              404 page not found
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <ul role="list" className="list-disc space-y-1 pl-5">
                <li>
                  We are sorry, it appears your requested page was not found{" "}
                </li>
                <li>Please retry your request</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

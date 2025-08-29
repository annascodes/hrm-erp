"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold p-2 text-center">Feature is under development, will be ready soon.</h1>
      <button
        onClick={() => router.back()}
        className="mt-4 flex items-center gap-2 text-blue-500 hover:underline"
      >
        <FiArrowLeft /> Go Back
      </button>
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

interface Props {
  url?: string;
  handleBack?: () => void;
}
export default function Backbar({ url, handleBack }: Props) {
  const router = useRouter();

  function back() {
    if (url) {
      router.push(url);
    } else router.back();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          handleBack ? handleBack() : back();
        }}
        className="bg-violet-600 disabled:bg-gray-600 text-white disabled:text-gray-400
                   active:bg-violet-800 hover:bg-violet-700 font-bold uppercase px-1 py-1 rounded-full
                   shadow-md hover:shadow-lg focus:shadow-lg focus:bg-violet-700 ease-linear transition-all 
                   duration-150"
      >
        <IoMdArrowRoundBack />
      </button>
    </>
  );
}

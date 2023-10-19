import Image from "next/image";
import { FaFileDownload, FaFileUpload } from "react-icons/fa";

export default function Working() {
  return (
    <>
      <div className="">
        <div className="p-6 rounded-lg shadow-lg shadow-black bg-gray-600">
          <h5 className="mb-4 text-lg font-bold">
            EM BREVE ...
          </h5>
          <div className="justify-center">
            <Image
              src="/images/working.svg"
              priority
              width={40}
              height={40}
              alt="makit"
              className="h-20 w-20"
            />
          </div>
        </div>
      </div>
    </>
  );
}

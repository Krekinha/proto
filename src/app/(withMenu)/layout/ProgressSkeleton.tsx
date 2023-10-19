"use client";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { useState } from "react";
import { useNFCalcProgressContext } from "@/context/NFCalcProgressContext";

export default function ProgressSkeleton() {
  const { progressVal, setProgressVal } = useNFCalcProgressContext();
  const [progress, setProgress] = useState(0);

  /*useEffect(() => {
    let timerId: null | NodeJS.Timer = null;

    timerId = setInterval(() => {
      const p = Math.ceil(getRandomArbitrary(0, 100) / 10) * 10;
      setProgress(p);
    }, 5000);

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, []);*/

  /*useEffect(() => {
    setProgress(progressVal);
  }, [progress, progressVal, setProgressVal]);*/

  return (
    <div className="flex items-center justify-center space-x-2 mt-5">
      <ProgressPrimitive.Root
        value={progressVal}
        className="h-3 w-full overflow-hidden rounded-full bg-white dark:bg-gray-900"
      >
        <ProgressPrimitive.Indicator
          style={{ width: `${progressVal}%` }}
          className="h-full bg-purple-500 duration-300 ease-in-out dark:bg-white"
        />
      </ProgressPrimitive.Root>
    </div>
  );
}

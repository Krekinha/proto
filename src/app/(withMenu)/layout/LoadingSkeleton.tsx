interface props {
  model: number;
}

export default function LoadingSkeleton({ model }: props) {
  // You can add any UI inside Loading, including a Skeleton.

  return (
    <>
      {model == 1 && (
        <div className="flex flex-col relative mt-10 items-center justify-center">
          <div
            className="text-blue-500 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
          <div className="flex justify-center mt-3">
            <span className="text-blue-400 text-sm">Aguarde...</span>
          </div>
        </div>
      )}
      {model == 2 && (
        <div
          className="text-red-500 inline-block h-5 w-5 animate-spin rounded-full border-4
                     border-solid border-current border-r-transparent align-[-0.125em] 
                     motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      )}
    </>
  );
}

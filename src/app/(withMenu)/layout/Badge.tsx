"use client";

interface PropsBadge {
  bgColor?: string;
  nameColor: string;
  valorColor?: string;
  divideColor?: string;
  name?: string;
  title?: string;
  valor?: string;
}

export const Badge = ({
  bgColor,
  nameColor,
  valorColor,
  divideColor,
  name,
  title,
  valor,
}: PropsBadge) => {
  return (
    <div>
      <div
        title={title}
        className={`flex flex-auto rounded-full px-[0.65em] pt-[0.35em] pb-[0.30em] 
                    text-center align-middle text-[0.65em] 
                    font-semibold leading-none ${nameColor} ${bgColor}`}
      >
        <div className=" flex-shrink-0">{name}</div>
        <div className={`px-1 ${divideColor}`}>|</div>
        <div className={`flex-shrink-0 ${valorColor}`}>{valor}</div>
      </div>
    </div>
  );
};

"use client";
import { ButtonHTMLAttributes } from "react";

type Props = {
  bgColor?: string;
  handleClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const BtnStandard = ({ bgColor, children, handleClick, ...rest }: Props) => {
  return (
    <>
      <div>
        <label
        onClick={handleClick}
          className={`bg-${bgColor}-600 disabled:bg-gray-600 text-white disabled:text-gray-400 
                     active:bg-${bgColor}-800 hover:bg-${bgColor}-700 font-semibold rounded shadow-md 
                     hover:shadow-lg focus:shadow-lg focus:bg-${bgColor}-700 ease-linear transition-all 
                     cursor-pointer duration-150 px-4 py-1 select-none`}
        >
          {children}
        </label>
      </div>
    </>
  );
};

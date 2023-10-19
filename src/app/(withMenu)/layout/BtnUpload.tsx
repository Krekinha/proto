"use client";
import { ButtonHTMLAttributes, ChangeEvent, Children } from "react";

type Props = {
  fileExt?: string;
  bgColor?: string;
  isMultiple?: boolean;
  fileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const BtnUpload = ({
  fileExt,
  fileChange,
  bgColor,
  isMultiple,
  children,
  disabled,
  ...rest
}: Props) => {
  return (
    <>
      <div>
        <label
          title="Importar xmls das notas fiscais"
          className={`${
            disabled
              ? "bg-gray-600 text-gray-400 font-semibold rounded shadow-md px-4 py-1 select-none"
              : `${`bg-${bgColor}-600 text-white active:bg-${bgColor}-800 hover:bg-${bgColor}-700
                 font-semibold rounded shadow-md hover:shadow-lg focus:shadow-lg"
                 focus:bg-${bgColor}-700 ease-linear transition-all cursor-pointer duration-150 px-4 py-1 select-none`}`
          }`}
        >
          {children}
          <input
            type="file"
            accept={fileExt}
            multiple={isMultiple}
            className="hidden"
            onChange={fileChange}
            disabled={disabled}
          />
        </label>
      </div>
    </>
  );
};

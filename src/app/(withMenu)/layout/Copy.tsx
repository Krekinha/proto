"use client";
import { CgCopy } from "react-icons/cg";
import { notifyService } from "@/services/notifyService";


interface CopyProps {
  textColor?: string;
  textToCopy: string;
}

export const Copy = ({ textColor, textToCopy }: CopyProps) => {
  function copyToClipboard() {
    if (!textToCopy) {
      notifyService.error("Não há texto para ser copiado");
    } else {
      navigator.clipboard.writeText(textToCopy);
      notifyService.success("Copiado para área de transferância!");
    }
  }

  return (
    <>
      
      <CgCopy
        onClick={() => copyToClipboard()}
        title="Copiar para área de transferância"
        className={`${textColor} cursor-pointer h-[15px] w-[15px]`}
      />
    </>
  );
};

"use client";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import React, { Fragment, useState } from "react";
import { MdHelp } from "react-icons/md";
import Link from "next/link";

interface ButtonProps {
  onClick?: () => void;
}
interface DialogProps {}
export const HelpButton: React.FC<ButtonProps> = (
  { onClick },
  props: DialogProps
) => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="bg-white disabled:bg-gray-600 disabled:text-gray-400
                       rounded-full shadow-md hover:shadow-lg focus:shadow-lg 
                       transition-all duration-150"
        >
          <MdHelp className="text-blue-500 w-[0.90rem] h-[0.90rem]" />
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* CONTENT */}
            <DialogPrimitive.Content
              forceMount
              className={clsx(
                "fixed z-50",
                "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-white dark:bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
            >
              <DialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                O que é o RBT12?
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                O RBT12 (Receita bruta acumulada nos doze meses anteriores ao PA
                (Período de apuração)), é a soma (ou média em alguns casos), do
                faturamento total da empresa nos últimos 12 meses anteriores ao
                mês que está ocorrendo a retenção do ISS. Seu valor pode ser
                encontrato no último extrato do Simples Nacional, no item
                <span className="text-blue-600 font-semibold ml-1">
                  2.1 Discriminativo de Receitas
                </span>
                . Se preferir, use a opção{" "}
                <span className="font-semibold ml-1">Importar extrato</span>:
              </DialogPrimitive.Description>

              <div>
                <Link
                  href="/images/help-01.png"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/images/help-01.png"
                    width={758}
                    height={89}
                    alt="makit"
                    className="w-auto h-auto"
                  />
                </Link>
              </div>

              <DialogPrimitive.Close
                className={clsx(
                  "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                  "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
              >
                <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

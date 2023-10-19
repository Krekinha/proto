"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { ImCalculator } from "react-icons/im";
import { BiChevronRight } from "react-icons/bi";
import { FaFileDownload, FaFileUpload } from "react-icons/fa";
import { CgMenu } from "react-icons/cg";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdHelp } from "react-icons/io";

interface RadixMenuItem {
  label: string;
  shortcut?: string;
  icon?: ReactNode;
  link: string;
}

export default function NavDropDownMenu() {
  const generalMenuItems: RadixMenuItem[] = [
    {
      label: "Ajuda",
      icon: <IoMdHelp className=" text-sky-500 mr-2 h-3.5 w-3.5" />,
      link: "#", //"/settings"
    },
    {
      label: "Configurações",
      icon: <IoSettingsSharp className=" text-sky-500 mr-2 h-3.5 w-3.5" />,
      link: "#", //"/settings"
    },
  ];

  return (
    <>
      <div className="relative inline-block text-left ml-3">
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button
              type="button"
              className="bg-gray-600 text-white active:bg-gray-800 hover:bg-gray-700 py-1 px-1 border font-bold uppercase shadow-md hover:shadow-lg outline-none focus:shadow-lg focus:bg-gray-700 mr-1 mb-1 ease-linear transition-all duration-150 rounded-full"
            >
              <CgMenu className="w-5 h-5 text-white" />
            </button>
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align="end"
              sideOffset={5}
              className={clsx(
                "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
                "bg-zinc-900 ml-4 border border-zinc-600"
              )}
            >
              {/* NFCalc Menu */}
              <DropdownMenuPrimitive.Sub>
                <DropdownMenuPrimitive.SubTrigger
                  className={clsx(
                    "flex w-full cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                    "text-gray-500 hover:bg-zinc-700 cursor-pointer"
                  )}
                >
                  <ImCalculator className="mr-2 h-3.5 w-3.5 text-sky-500" />
                  <span className="flex-grow text-gray-300">
                    NFCalc
                  </span>
                  <BiChevronRight className="h-3.5 w-3.5 text-sky-500" />
                </DropdownMenuPrimitive.SubTrigger>

                <DropdownMenuPrimitive.Portal>
                  <DropdownMenuPrimitive.SubContent
                    className={clsx(
                      "origin-radix-dropdown-menu radix-side-right:animate-scale-in",
                      "w-full rounded-md px-1 py-1 text-xs shadow-md",
                      "bg-zinc-900 border border-zinc-600"
                    )}
                  >
                    <Link href={"/nfcalc/calcsaida"} className="font-medium">
                      <DropdownMenuPrimitive.Item
                        className={clsx(
                          "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                          "text-gray-500 cursor-pointer hover:bg-zinc-700"
                        )}
                      >
                        <FaFileDownload className="text-blue-500 mr-2 h-3.5 w-3.5" />

                        <span className="flex-grow text-gray-300">
                          Notas de Saída/Venda
                        </span>
                      </DropdownMenuPrimitive.Item>
                    </Link>
                    <Link href={"/nfcalc/calcentrada"} className="font-medium">
                      <DropdownMenuPrimitive.Item
                        className={clsx(
                          "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                          "text-gray-500 cursor-pointer hover:bg-zinc-700 "
                        )}
                      >
                        <FaFileUpload className=" text-green-500 mr-2 h-3.5 w-3.5" />

                        <span className="flex-grow text-gray-300">
                          Notas de Entrada/Compra
                        </span>
                      </DropdownMenuPrimitive.Item>
                    </Link>
                  </DropdownMenuPrimitive.SubContent>
                </DropdownMenuPrimitive.Portal>
              </DropdownMenuPrimitive.Sub>

              <DropdownMenuPrimitive.Separator className="my-1 h-px bg-gray-700" />

              {/* Outros Menus */}

              {generalMenuItems.map(({ label, icon, shortcut, link }, i) => (
                <Link key={`${label}-${i}`} href={link} className="font-medium">
                  <DropdownMenuPrimitive.Item
                    className={clsx(
                      "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                      "text-gray-500 hover:bg-zinc-700 cursor-pointer"
                    )}
                  >
                    {icon}
                    <span className="flex-grow text-gray-300">
                      {label}
                    </span>
                    {shortcut && <span className="text-xs">{shortcut}</span>}
                  </DropdownMenuPrimitive.Item>
                </Link>
              ))}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </div>
    </>
  );
}
